import cgi
import os

from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app

class ubiquitypage(webapp.RequestHandler):
  def get(self):
    head = os.path.join(os.path.dirname(__file__), 'static/head2.html')
    foot = os.path.join(os.path.dirname(__file__), 'static/extensions.html')
    path = os.path.join(os.path.dirname(__file__), 'static/extensions.html')
    self.response.out.write(template.render(head, {}))
    self.response.out.write(template.render(path, {}))
    self.response.out.write(template.render(foot, {}))