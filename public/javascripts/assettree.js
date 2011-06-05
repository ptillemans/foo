createTreeView = function(id) {

  var config = {
    xml_data: {
      "ajax" : {
        "url": "/assets",
        "data" : function(n) {
          return {
            "operation" : "getchildren",
            "id" : n.attr ? n.attr("id") : 0
          }
        }
      },
      "data" : '<?xml version="1.0" encoding="utf-8"?>'
        + '<root>'
        + '  <item id="_1" state="closed">'
        + '    <content><name>node 1 </name></content>'
        + '  </item>'
        + '  <item id="2" state="closed">'
        + '    <content><name>node 2 </name></content>'
        + '  </item>'
        + '  <item id="3" state="closed">'
        + '    <content><name>node 3 </name></content>'
        + '  </item>'
        + '</root>',
      xsl: "nest"
    },
    plugins : [ "themes", "xml_data" ]
  };

  jQuery(id).jstree(config);
}
