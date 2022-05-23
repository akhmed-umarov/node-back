const path = require('path') ; let fs = require('fs') ; let http = require('http'); 
const EventEmitter = require('events'); 




// const DirName = path.join(__dirname , 'public'); 

// fs.mkdir(DirName , (er)=>{{ 
//    if (er){ 
//       throw er
//    }
// }})



// fs.writeFile(path.join(__dirname , 'public' , 'index.html') , '' , (er)=> {
// if (er){ 
// throw er
// }
// })

// fs.writeFile(path.join(__dirname , 'public' , 'center.html') , '' ,  (er)=> {
//    if (er){ 
//    throw er
//    }
//    })

//    fs.writeFile(path.join(__dirname , 'public' , 'error.html') , '' , (er)=> {
//       if (er){ 
//       throw er
//       }
// //       })
// const server = http.createServer((req , res)=> { 

//    let filePath = path.join(__dirname , 'publick' , req.url === '/' ? 'index.html' : req.url)



//    //более сложный путь проверки и добавления '.html" к пути req.url
//    const ext = path.extname(filePath); 
//    if (!ext){ 
//       filePath += '.html'
//    }

   
//    //для того чтобы подключить таблицы стилей мне надо проверить какой вид контента у меня передается на сервер и в зависимости от этого действовать

//    let contentType = 'text/html'


//    switch (ext) { 
//       case '.css': 
//       contentType = 'text/css'
//       break
//       case '.js':
//       contentType = 'text/js' 
//       break 
//       default: 
//       contentType = 'text/html'
//    }

// //таким образом мы добавили все варианты элементов на сайт




   
//    console.log(filePath); 

     











//оригинал

// const server = http.createServer( (request , responce)=>{ 

   
//    let filePath = path.join(__dirname , 'public' , request.url === "/" ? 'index.html' : request.url)



//    const ext = path.extname(filePath); 
//    if (!ext) { 
//       filePath += '.html'
//    }
   
//    // console.log(request.url)

//    let typeFiles = 'text/html'

//    switch (ext){ 
//       case '.css' :
//    typeFiles = 'text/css' 
//       case '.js': 
//    typeFiles = 'text/js'
//       default: 
//    typeFiles = 'text/html'
//    } 

// console.log(filePath)

//end original
const server = http.createServer((request , responce)=> { 

   let filePath = path.join(__dirname , 'public' , request.url === '/' ? 'index.html' : request.url)



   //более сложный путь проверки и добавления '.html" к пути req.url
   const ext = path.extname(filePath); 
   if (!ext){ 
      filePath += '.html'
   }

   
   //для того чтобы подключить таблицы стилей мне надо проверить какой вид контента у меня передается на сервер и в зависимости от этого действовать

   let typeFiles = 'text/html'


   switch (ext) { 
      case '.css': 
      typeFiles = 'text/css'
      break
      case '.js':
      typeFiles = 'text/js' 
      break
      default: 
      typeFiles = 'text/html'
   }

   // let typeFiles = 'text/html'

   //    switch (ext){ 
   //       case '.css':
   //    typeFiles = 'text/css' 
   //       case '.js': 
   //    typeFiles = 'text/js'
   //       default: 
   //    typeFiles = 'text/html'
   //    } 

//таким образом мы добавили все варианты элементов на сайт


   console.log(filePath); 

   fs.readFile(filePath , (err , page)=> {
      
      
      if (err) { 
         fs.readFile(path.join(__dirname , 'public', 'error.html') , (error , data)=>{ 
            if (error) { 
            responce.writeHead(500)
            responce.end('Error 404')
            } else {
            responce.writeHead(200 , { 
               'Content-Type': 'text/html'
            }) 
            responce.end(data)
      }
      })
      } else {

      responce.writeHead(200 , { 
      'Content-Type': typeFiles
      })
      responce.end(page)
   }
   })
      

} )

const PORT = process.env.PORT || 3000

server.listen(PORT , ()=> { 
   console.log(`Server has been started on ${PORT}...`)
})
// server.listen(3000 , (er)=> { 
//    if (er){ 
//       throw er
//    }
// })



