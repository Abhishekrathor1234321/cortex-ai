import proxy from "express-http-proxy";

export const proxyWithUser =
(serviceUrl)=>{

 return proxy(
  serviceUrl,
  {

   timeout: 120000, // 120 seconds — Render free tier ko wake up hone ka time dene ke liye

   proxyReqPathResolver: (req) => {
     return req.url;
   },

   proxyReqOptDecorator:
   (proxyReqOpts, srcReq)=>{

    if(srcReq.user){

      proxyReqOpts.headers[
       "x-user-id"
      ] =
      srcReq.user.userId;

      proxyReqOpts.headers[
       "x-user-email"
      ] =
      srcReq.user.email;
      proxyReqOpts.headers[
       "x-user-avatar"
      ] =
      srcReq.user.avatar

    }

    return proxyReqOpts;

   },

   proxyErrorHandler: (err, res, next) => {
     console.log("Proxy Error:", err.message);
     return res.status(503).json({
       success: false,
       message: "Service temporarily unavailable, please try again in a moment (backend service is waking up)."
     });
   }

  }
 );

}