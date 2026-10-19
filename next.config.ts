import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images:{
qualities: [10,20,50,60,70,80,100],
remotePatterns:[
  {
    protocol: "https",
    hostname:"ecommerce.routemisr.com",
    pathname:"/Route-Academy-products/*"
  },
    {
    protocol: "https",
    hostname:"ecommerce.routemisr.com",
    pathname:"/Route-Academy-brands/*"
  },
  {
  protocol: "https",
  hostname: "ecommerce.routemisr.com",
  pathname: "/Route-Academy-categories/**",
},
]


},


  
  reactCompiler: true,
};

export default nextConfig;
