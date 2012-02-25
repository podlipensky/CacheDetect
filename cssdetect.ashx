<%@ WebHandler Language="C#" Class="cssdetect" %>

using System;
using System.IO;
using System.Web;

public class cssdetect : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.Cache.SetMaxAge(new TimeSpan(1,0,0,0));
        context.Response.Cache.SetCacheability(HttpCacheability.Public);
        
        //context.Response.Cache.SetCacheability(HttpCacheability.NoCache);
        
        context.Response.ContentType = "text/css";

        int counter = (int)context.Application["counter"];
        context.Response.Write(string.Format(".cachedetect{{ width: {0}px; }}", counter));
        if(counter == int.MaxValue)
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