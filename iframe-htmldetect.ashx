<%@ WebHandler Language="C#" Class="iframe_htmldetect" %>

using System;
using System.Web;

public class iframe_htmldetect : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        TimeSpan refresh = new TimeSpan(0, 0, 15);
        HttpContext.Current.Response.Cache.SetMaxAge(refresh);
        context.Response.Cache.SetCacheability(HttpCacheability.Public);
        
        //context.Response.Cache.SetCacheability(HttpCacheability.NoCache);
        
        context.Response.ContentType = "text/html";
        int counter = (int)context.Application["counter"];
        context.Response.Write(counter);

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