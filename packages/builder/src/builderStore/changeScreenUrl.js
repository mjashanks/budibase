export default function(state, oldUrl, newUrl) {

  

}

/*
/^\/customer\/.+\/another\/[^\/]+$/i
*/

const splitUrl = url => {
  const parts = url.split("/")
     .filter(part => part)
     .map(part => ({
         type: part.startsWith(":") ? "parameter" : "static",
         text: part
       }))

  const regEx = parts.map(part => part.type === "parameter" ? ".+").join("\/")
}

//const replaceUrl = ()
