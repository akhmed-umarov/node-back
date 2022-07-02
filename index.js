const path = require('path') ; let fs = require('fs') ; let http = require('http'); 
const EventEmitter = require('events'); 

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



