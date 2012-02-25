<%@ WebHandler Language="C#" Class="jsdetect" %>

using System;
using System.IO;
using System.Web;

public class jsdetect : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        TimeSpan refresh = new TimeSpan(0, 0, 15);
        HttpContext.Current.Response.Cache.SetMaxAge(refresh);
        context.Response.Cache.SetCacheability(HttpCacheability.Public);
        //context.Response.Cache.SetCacheability(HttpCacheability.NoCache);
        
        context.Response.ContentType = "text/javascript";
        string source = File.ReadAllText(context.Request.PhysicalApplicationPath + "/jsdetect-source.js");
        int counter = (int)context.Application["counter"];
        context.Response.Write(string.Format("var version={0}; {1}", counter, source));
        if (counter == int.MaxValue)
        {
            counter = 0;
        }
        context.Application["counter"] = counter + 1;
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}