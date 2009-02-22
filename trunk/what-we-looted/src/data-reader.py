import re
import cgi
import os

from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app

class MainPage(webapp.RequestHandler):
  def listContains(self,list,value):
      try:
          has = list.index(value);
      except ValueError:
          has = -1;
      if has == -1:
          return 0;
      else:
          return 1;
      
  def get(self):
    template_values = {
        'monsters' : {},
    }
    path = os.path.join(os.path.dirname(__file__), 'index.html')
    self.response.out.write(template.render(path, template_values))      
  def post(self):
    rawstr = r"""Loot of (a|an) (?P<monster>.*): (?P<loot>.*,?)"""
    matchstr = cgi.escape(self.request.get('content'))

    monsters = {}
    loot = {}
    multiItems = {}

    for m in re.finditer(rawstr, matchstr):
        if monsters.has_key(m.group("monster")):
           monsters[m.group("monster")] += 1
        else:
            monsters[m.group("monster")] = 1
            loot[m.group("monster")] = {}
        
        items = m.group("loot").split(",")
        for item in items:
            item = item.strip()
            qty = re.match("\d+",item)
            if qty:
                qty = qty.group(0)
                item = re.sub("\d+"," ",item).strip().rstrip("s");
                if not multiItems.has_key(item):
                   multiItems[item] = []
                if not self.listContains(multiItems[item],m.group("monster")):
                    multiItems[item].append(m.group("monster"));
            else:
                qty = 1
                item = re.sub("(a|an) "," ",item).strip()
            if loot[m.group("monster")].has_key(item):
                loot[m.group("monster")][item] += int(qty)
            else:
                loot[m.group("monster")][item] = int(qty)
    
    monstersProcessed = []
    for monsterName, lootList in loot.iteritems():
       row = {'name':monsterName,'killed':monsters[monsterName],'loot': []}
       for lootName,lootQty in lootList.iteritems():
           if multiItems.has_key(lootName) and self.listContains(multiItems[lootName],monsterName):
               qty = str(round(float(lootQty)/monsters[monsterName],2)) + " on average"
           else:
               qty = str(round(float(lootQty)/monsters[monsterName]*100,2)) + " % chance"
           row['loot'].append({'name':lootName,'qty':lootQty,'ratio':qty})
       monstersProcessed.append(row)
    template_values = {
        'monsters' : monstersProcessed,
    }
        
    path = os.path.join(os.path.dirname(__file__), 'index.html')
    self.response.out.write(template.render(path, template_values))    

application = webapp.WSGIApplication(
                                     [('/', MainPage)],
                                     debug=False)

def main():
  run_wsgi_app(application)

if __name__ == "__main__":
  main()
