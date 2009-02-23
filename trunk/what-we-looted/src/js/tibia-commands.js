CmdUtils
		.CreateCommand( {
			name :"tibia-character",
			homepage :"http://what-we-looted.appspot.com/ubiquity",
			author : {
				name :"Rosomacek",
				email :"rosomacekms@nastnet.com"
			},
			license :"GPL",
			description :"Get's a character home page for Tibia MMORPG",
			help :"Type character name after the command, to see his home page",
			takes : {
				"input" :noun_arb_text
			},
			preview : function(pblock, input) {
				pblock.innerHTML = "Retriving character information";
				CmdUtils.previewGet(pblock,
						"http://www.tibia.com/community/?subtopic=characters&name="
								+ input.text.replace(/\s/, "+"), {}, function(
								source) {
							pblock.innerHTML = jQuery(".Border_3", source)
									.eq(0).each(
											function() {
												jQuery("td", this).css("color",
														"black")
											}).html();

						});
			},
			execute : function(input) {
				Utils
						.openUrlInBrowser("http://www.tibia.com/community/?subtopic=characters&name="
								+ input.text.replace(/\s/, "+"))
			}
		});

CmdUtils.CreateCommand( {
	name :"tibia-wiki",
	homepage :"http://nastnet.com/ubiquity",
	author : {
		name :"Piotr Nastaly",
		email :"piotr.nastaly@nastnet.com"
	},
	license :"GPL",
	description :"Get's a character home page for Tibia MMORPG",
	help :"Type subject to search it in Wiki",
	takes : {
		"input" :noun_arb_text
	},
	preview : function(pblock, input) {
		var template = "Hello ${name}";
		pblock.innerHTML = "Retriving article";
		pblock.innerHTML = "Retriving character information";
		CmdUtils.previewGet(pblock, "http://tibia.wikia.com/wiki/"
				+ input.text.replace(/\s/, "_"), {},
				function(source) {
					pblock.innerHTML = jQuery(
							"#article > #bodyContent > table", source).eq(0)
							.find("td").eq(0).each( function() {
								jQuery("td", this).css("font-size", "10px");
							}).html();

				});
	},
	execute : function(input) {
		Utils.openUrlInBrowser("http://tibia.wikia.com/wiki/"
				+ input.text.replace(/\s/, "_"));
	}
});

CmdUtils
		.CreateCommand( {
			name :"tibia-online",
			homepage :"http://what-we-looted.appspot.com/ubiquity",
			author : {
				name :"Rosomacek",
				email :"rosomacekms@gmail.com"
			},
			license :"GPL",
			description :"Displays online counter from pskonejott.com page",
			help :"Type chracter name after the command to see the result. Hit enter to be taken to the site",
			takes : {
				"input" :noun_arb_text
			},
			preview : function(pblock, input) {
				pblock.innerHTML = "Retriving data";
				CmdUtils
						.previewGet(
								pblock,
								"http://www.pskonejott.com/otc_display.php?show=Char&character="
										+ input.text.replace(/\s/, "+"),
								{},
								function(source) {
									var data, ro2, row3, out
									data = jQuery("#otc", source).eq(0).html();
									row2 = jQuery("tr", data).eq(1).find("td");
									row3 = jQuery("tr", data).eq(2).find("td");
									out = "<table style=\"font-size:12px;border:colapse;table-layout:auto\">"
									for (i = 0; i < row2.length; i++) {
										if (row2.get(i).textContent
												.match(/LINK/))
											continue;
										if (row2.get(i).innerHTML.match(/<br/)) {
											out += "<tr><td>"
													+ row2.get(i).innerHTML
													+ "</td><td>"
													+ row3.get(i).innerHTML
													+ "</td></tr>";
										} else {
											out += "<tr><td>"
													+ row2.get(i).textContent
													+ "</td><td>"
													+ row3.get(i).textContent
															.replace(/h/, "h ")
													+ "</td></tr>";
										}
									}
									;
									out += "</table>";
									pblock.innerHTML = out;
								});
			},
			execute : function(input) {
				Utils
						.openUrlInBrowser("http://www.pskonejott.com/otc_display.php?show=Char&character="
								+ input.text.replace(/\s/, "+"));
			}
		});