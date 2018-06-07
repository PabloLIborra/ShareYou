var numFotos = 0;
var numFotosNegative = 0;
var uduD = false;
var numPag = 0;
var totalPag = 0;
var totalBus = 0;
var numBus = 0;

function contarE(){
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost/practica2/rest/entrada/';
    xhr.open('GET', url, true);
    xhr.onload = function(){
        let v = JSON.parse(xhr.responseText);
        if(v.RESULTADO == 'ok'){
            totalPag = Math.round(v.FILAS.length/6);
            if (totalPag+0.5 > v.FILAS.length/6)
                totalPag = totalPag+1;
        }
    }
    xhr.send();
}

function upPag(){
    if (numPag < totalPag-1)
    numPag = numPag+1;
    document.getElementById("pagina").innerHTML = numPag+1;
    mostrarEntradas();
    mostrarComentarios();

}

function downPag(){
    if (numPag > 0)
    numPag = numPag-1;
    document.getElementById("pagina").innerHTML = numPag+1;
    mostrarEntradas();
    mostrarComentarios();

}

function iniPag(){
    numPag = 0;
    document.getElementById("pagina").innerHTML = numPag+1;
    mostrarEntradas();
    mostrarComentarios();

}

function finalPag(){
    numPag = totalPag-1;
    document.getElementById("pagina").innerHTML = numPag+1;
    mostrarEntradas();
    mostrarComentarios();

}

function upPagB(event){
    if (numBus < totalBus-1)
    numBus = numBus+1;
    document.getElementById("pagina").innerHTML = numBus+1;
    let f = document.getElementById("formB");
    buscar(f,event);

}

function downPagB(){
    if (numBus > 0)
    numBus = numBus-1;
    document.getElementById("pagina").innerHTML = numBus+1;
    let f = document.getElementById("formB");
    buscar(f,event);

}

function iniPagB(){
    numBus = 0;
    document.getElementById("pagina").innerHTML = numBus+1;
    let f = document.getElementById("formB");
    buscar(f,event);

}

function finalPagB(){
    numBus = totalBus-1;
    document.getElementById("pagina").innerHTML = numBus+1;
    let f = document.getElementById("formB");
    buscar(f,event);

}

function mostrarEntradas(){
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost/practica2/rest/entrada/';
    let section = document.querySelector("section");
    url += '?pag=' + numPag + '&lpag=' + 6;
    xhr.open('GET', url, true);
    xhr.onload = function(){
        let v = JSON.parse(xhr.responseText);
        if(v.RESULTADO == 'ok'){
            
            while( fc = section.querySelector('h3+div>article') )
                fc.remove();
            
            let plantilla = section.querySelector('h3+div>template');
            
            for(let i=0; i < v.FILAS.length ; i++){
                
                let e = v.FILAS[i];
                let foto = 'http://localhost/practica2/fotos/' + e.fichero;
                
                let elem = plantilla.content.cloneNode(true);
                
                elem.querySelector('p:first-of-type').innerHTML = '<b>'+e.nombre+'</b>';
                elem.querySelector('figure>img').src = foto;
                elem.querySelector('figure>img').alt = e.descripcion_foto;
                elem.querySelector('figure>figcaption').innerHTML = e.descripcion;
                elem.querySelector('p:nth-of-type(2)').innerHTML = '<b>Autor: </b>'+ e.login;
                elem.querySelector('p:nth-of-type(3)').innerHTML = '<b>Fecha de Publicación: </b>'+ e.fecha;
                elem.querySelector('p:nth-of-type(5)').innerHTML = e.ncomentarios + ' comentarios';
                elem.querySelector('p:nth-of-type(4)').innerHTML = e.nfotos + ' fotos';
                elem.querySelector('figure>a').href = "entrada.html?id="+e.id;    
                
                
               section.querySelector('h3:first-of-type+div').appendChild(elem);
            }
        }else{
            alert('ERROR de algun tipo');
        }
    }
    xhr.send();
    return false;
}

function mostrarEntradas2(frm){
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost/practica2/rest/entrada/';
    let section = frm.parentNode.parentNode;
    url += '?pag=' + frm.pag.value + '&lpag=' + frm.lpag.value;
    xhr.open('GET', url, true)
    xhr.onload = function(){
        let v = JSON.parse(xhr.responseText);
        if(v.RESULTADO == 'ok'){
            let html = '';
            section.querySelector('h2+div').innerHTML = '';
            
            while( fc = section.querySelector('h2+div').firstChild )
                fc.remove();
            
            for(let i=0; i < v.FILAS.length ; i++){
                
                let e = v.FILAS[i];
                let foto = 'http://localhost/practica2/fotos/' + e.fichero;
                
                let articulo = document.createElement('article');
                let h3 = document.createElement('h3');
                let div = document.createElement('div');
                let img = document.createElement('img');
                let pr1 = document.createElement('p');
                let pie = document.createElement('footer');
                let pr2 = document.createElement('p');
                let time = document.createElement('time');
                let pr3 = document.createElement('p');
                let pr4 = document.createElement('p');
                
                articulo.appendChild(h3);
                articulo.appendChild(div);
                articulo.appendChild(pie);
                
                div.appendChild(img);
                div.appendChild(pr1);
                
                pie.appendChild(pr2);
                pie.appendChild(time);
                pie.appendChild(pr3);
                pie.appendChild(pr4);
                
                
                h3.innerHTML = e.nombre;
                img.src = foto;
                img.setAttribute('alt', e.descripcion_foto);
                pr1.innerHTML = e.descripcion;
                pr2.innerHTML = e.login;
                time.setAttribute('datetime', e.fecha);
                time.innerHTML = e.fecha;
                pr3.innerHTML = e.nfotos + ' fotos';
                pr4.innerHTML = e.ncomentarios + ' comments';
                
                section.querySelector('h2+div').appendChild(articulo);
            }
        }else{
            alert('ERROR de algun tipo');
        }
    }
    xhr.send();
    return false;
}


function mostrarComentarios(){
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost/practica2/rest/comentario/?u=10';
    let section = document.querySelector("section");
    
    xhr.open('GET', url, true);
    xhr.onload = function(){
        let v = JSON.parse(xhr.responseText);
        if(v.RESULTADO == 'ok'){
            
            while( fc = section.querySelector('h3:nth-of-type(2)+div>article') )
                fc.remove();
            


            let plantilla = section.querySelector('h3:nth-of-type(2)+div>template');
            
            for(let i=0; i < v.FILAS.length ; i++){
                
                let e = v.FILAS[i];

                let elem = plantilla.content.cloneNode(true);
                
                    
                elem.querySelector('p:nth-of-type(3)').innerHTML = '<b>'+e.titulo+'</b>';
                elem.querySelector('p:nth-of-type(4)').innerHTML = e.texto;
                elem.querySelector('p:first-of-type').innerHTML = '<b>Autor: </b>'+ e.login;
                elem.querySelector('p:nth-of-type(2)').innerHTML = '<b>Fecha de Publicación: </b>'+ e.fecha;
                elem.querySelector('a:first-of-type').href = "entrada.html?id="+e.id_entrada;    
                
            
                section.querySelector('h3:nth-of-type(2)+div').appendChild(elem);
            }
        }else{
            alert('ERROR de algun tipo');
        }
    }
    xhr.send();
    return false;
}

function anyadirFoto(){
    let form = document.querySelector("form");
    let plantilla = form.querySelector("div>template");
    let elem = plantilla.content.cloneNode(true);
    elem.querySelector("p:first-of-type").id = numFotos;
    var url = '#'+numFotos;
    numFotos = numFotos+1;
    form.querySelector("div").appendChild(elem);
    location.href = url;
}

function borrarFoto(but){
    let div = but.parentNode.parentNode;
    let foto = div.querySelector("div>p>img");
    var a = parseInt(foto.name);
    if ( a/1024 > 500){
        numFotosNegative = numFotosNegative-1;
    }
    div.remove();
}

function secFoto(img){
    let div = img.parentNode.parentNode;
    let input = div.querySelector("input");
    input.click();
}

function actualizarFoto(input){
    let div = input.parentNode;
    let foto = div.querySelector("p>img");
    readURL(input,foto);
}

function readURL(input,img) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
             img.src = e.target.result;
        }

        reader.readAsDataURL(input.files[0]);
        let tam1 = parseInt(img.name);
        img.name = input.files[0].size;
        let tam2 = parseInt(img.name);
        if((input.files[0].size/1024) > 500){
            img.style.border = "5px solid red";
            numFotosNegative = numFotosNegative + 1;
        }else{
            img.style.border = "none";
            if (tam1 != 0){
                if (tam1/1024 > 500 && tam2/1024 < 500){
                    numFotosNegative = numFotosNegative - 1;
                }
            }
        }
    }
}

function subirEntrada(event, form){
    if ( numFotosNegative > 0){
        alert("Hay fotos de más de 500kB. Elimínelas");
        event.preventDefault();
    }else{
        event.preventDefault();
        let xhr = new XMLHttpRequest();
        let url = 'http://localhost/practica2/rest/entrada/'
        xhr.open('POST', url, true);
        let nombre = form.querySelector("p:first-of-type>input").value;
        let descripcion = form.querySelector("p:nth-of-type(2)>textarea").value;
        let div = form.querySelector("div");

        var formdata = new FormData();
        formdata.append("login", sessionStorage.login);
        formdata.append("nombre", nombre);
        formdata.append("descripcion", descripcion);
        xhr.setRequestHeader("Authorization", sessionStorage.clave);
        xhr.onload = function(){
            let v = JSON.parse(xhr.responseText);
            if ( v.RESULTADO == "ok"){
                subirFotos(v.id, div);
            }
        }       
        xhr.send(formdata);
        mostrarMensajeEntrada();
        
        
    }
}

function subirFotos(id, div){
    for ( var i = 1; i<=numFotos;i++){
        let xhr = new XMLHttpRequest();
        let url = 'http://localhost/practica2/rest/foto/'
        xhr.open('POST', url, true);
        let input = div.querySelector("div:nth-of-type("+i+")").querySelector("input");
        let texto = div.querySelector("div:nth-of-type("+i+")").querySelector("p:nth-of-type(3)>textarea").value;
        var formdata = new FormData();
        formdata.append("login", sessionStorage.login);
        formdata.append("id_entrada",id);
        formdata.append("texto", texto);
        formdata.append("foto", input.files[0]);
        xhr.setRequestHeader("Authorization", sessionStorage.clave);
        xhr.send(formdata);
    }
}

function registrarse(form, event){
    event.preventDefault();
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost/practica2/rest/usuario/';
    xhr.open('POST', url, true);
    let login = form.querySelector("p:first-of-type>input").value;
    let pwd = form.querySelector("p:nth-of-type(3)>input").value;
    let pwd2 = form.querySelector("p:nth-of-type(4)>input").value;
    let nombre = form.querySelector("p:nth-of-type(2)>input").value;
    let email = form.querySelector("p:nth-of-type(5)>input").value;
    
    if(pwd == pwd2 && usuD == false){
        var formdata = new FormData();
        formdata.append("login", login);
        formdata.append("pwd", pwd);
        formdata.append("pwd2", pwd2);
        formdata.append("nombre", nombre);
        formdata.append("email", email);

        mostrarMensaje();

        xhr.send(formdata);

    }
}


function disponible(input){
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost/practica2/rest/login/';
    url += input.value;
    xhr.open('GET', url, true);
    let parent = input.parentNode;
    let span = parent.querySelector("span");
    xhr.onload=function(){
        let v = JSON.parse(xhr.responseText);
        if(v.RESULTADO == 'ok'){
            if(v.DISPONIBLE == 'false'){
                input.style.borderBottom = "2px solid red";
                span.style.display = "block";
                usuD = true;
            }else{
                input.style.borderBottom = "2px solid black";
                span.style.display = "none";
                usuD = false;
            }
        }
    }
    xhr.send();
}

function comprobarPWD(input){
    let form = input.parentNode.parentNode;
    let pwd = form.querySelector("p:nth-of-type(3)>input").value;
    let pwd2 = input.value;
    let span = form.querySelector("p:nth-of-type(4)>span");
    if (pwd!=pwd2){
        span.style.display = "block";
        input.style.borderBottom = "2px solid red";

    }else{
        span.style.display = "none";
        input.style.borderBottom = "2px solid black";
    }
    
}

function mostrarMensaje(){
    let capa_fondo = document.createElement('div');
    let capa_frente = document.createElement('article');
    
    let html = '';
    
    capa_fondo.appendChild(capa_frente);
    
    html += '<p> Has sido registrado correctamente </p>';
    html += '<a href="login.html" onclick="this.parentNode.parentNode.remove();">CERRAR</a>';

    capa_frente.innerHTML = html;
    
    capa_fondo.classList.add('capa-fondo');
    capa_frente.classList.add('capa-frente');
    document.body.appendChild(capa_fondo);
}

function mostrarMensajeCom(id){
    let capa_fondo = document.createElement('div');
    let capa_frente = document.createElement('article');
    
    let html = '';
    
    capa_fondo.appendChild(capa_frente);
    
    html += '<p> Su mensaje ha sido enviado! </p>';
    html += '<a href="entrada.html?id='+id+'" onclick="this.parentNode.parentNode.remove();">CERRAR</a>';

    capa_frente.innerHTML = html;
    
    capa_fondo.classList.add('capa-fondo');
    capa_frente.classList.add('capa-frente');
    document.body.appendChild(capa_fondo);
}

function mostrarMensajeEntrada(){
    let capa_fondo = document.createElement('div');
    let capa_frente = document.createElement('article');
    
    let html = '';
    
    capa_fondo.appendChild(capa_frente);
    
    html += '<p> La entrada se ha subido correctamente </p>';
    html += '<a href="index.html" onclick="this.parentNode.parentNode.remove();">CERRAR</a>';

    capa_frente.innerHTML = html;
    
    capa_fondo.classList.add('capa-fondo');
    capa_frente.classList.add('capa-frente');
    document.body.appendChild(capa_fondo);
}

function mostrarMensajeLogin(hora){
    let capa_fondo = document.createElement('div');
    let capa_frente = document.createElement('article');
    
    let html = '';
    
    capa_fondo.appendChild(capa_frente);
    
    html += '<p> Has sido logueado correctamente </p>';
    html += '<p> Su última conexión fue: ' + hora + '</p>';
    html += '<a href="index.html" onclick="this.parentNode.parentNode.remove();">CERRAR</a>';

    capa_frente.innerHTML = html;
    
    capa_fondo.classList.add('capa-fondo');
    capa_frente.classList.add('capa-frente-login');
    document.body.appendChild(capa_fondo);
}

function mostrarMensajeError(){
    let capa_fondo = document.createElement('div');
    let capa_frente = document.createElement('article');
    
    let html = '';
    
    capa_fondo.appendChild(capa_frente);
    
    html += '<p>Ha fallado al loguearse</p>';
    html += '<a href="login.html" onclick="this.parentNode.parentNode.remove();">CERRAR</a>';

    capa_frente.innerHTML = html;
    
    capa_fondo.classList.add('capa-fondo');
    capa_frente.classList.add('capa-frente-error');
    document.body.appendChild(capa_fondo);
}

function mostrarMensajeComError(){
    let capa_fondo = document.createElement('div');
    let capa_frente = document.createElement('article');
    
    let html = '';
    
    capa_fondo.appendChild(capa_frente);
    
    html += '<p>Ha fallado al enviar el mensaje</p>';
    html += '<a onclick="this.parentNode.parentNode.remove();">CERRAR</a>';

    capa_frente.innerHTML = html;
    
    capa_fondo.classList.add('capa-fondo');
    capa_frente.classList.add('capa-frente-error');
    document.body.appendChild(capa_fondo);
    let form = document.getElementById("formCom");
    let titulo = form.querySelector("p:nth-of-type(1)>input").value;
    titulo.focus();
}

function loguearse(form, event){

    event.preventDefault();
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost/practica2/rest/login/';
    xhr.open('POST', url, true);
    let login = form.querySelector("p:first-of-type>input").value;
    let pwd = form.querySelector("p:nth-of-type(2)>input").value;
    
    var formdata = new FormData();
    formdata.append("login", login);
    formdata.append("pwd", pwd);

    xhr.onload = function() {
        let v =JSON.parse(xhr.responseText);
        
        if(v.RESULTADO == "ok"){
            sessionStorage["du"] = xhr.responseText;

            sessionStorage.setItem("id", v.id);
            sessionStorage.setItem("login", v.login);
            sessionStorage.setItem("clave", v.clave);
            sessionStorage.setItem("fecha", v.ultimo_acceso);
            sessionStorage.setItem("info", v.info);

            mostrarMensajeLogin(v.ultimo_acceso);
        }else{
            mostrarMensajeError();
        }
    }
    xhr.send(formdata);
    
}

function cargaIndex(){
    if(sessionStorage.getItem('login') != null){
        window.location.replace("index.html");
    }
}

function cargaIndexEntrada(){
    if(sessionStorage.getItem('login') == null){
        window.location.replace("index.html");
    }
}

function clearLogin(){
    let nav  = document.querySelector("nav");
    let login = nav.querySelector("a:nth-of-type(3)");
    let registro = nav.querySelector("a:nth-of-type(4)");
    let logout = nav.querySelector("a:nth-of-type(5)");
    let entrada = nav.querySelector("a:nth-of-type(6)");
   if(sessionStorage.getItem('login') != null){
       login.style.display = "none";
       registro.style.display = "none";
       logout.style.display = "initial";
       entrada.style.display = "initial";
   }else{
        login.style.display = "initial";
       registro.style.display = "initial";
       logout.style.display = "none";
       entrada.style.display = "none";
   }
}

function salir(){
    sessionStorage.clear();
}

function firefoxDate(){
    let a = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if(a){
        document.getElementById("iniF").style.display = "none";
        document.getElementById("finalF").style.display = "none";
        document.getElementById("FiniFN").style.display = "initial";
        document.getElementById("FiniFM").style.display = "initial";
        document.getElementById("FiniFY").style.display = "initial";
        document.getElementById("FfinalFN").style.display = "initial";
        document.getElementById("FfinalFM").style.display = "initial";
        document.getElementById("FfinalFY").style.display = "initial";

        document.getElementById("lIFN").style.display = "initial";
        document.getElementById("lIFM").style.display = "initial";
        document.getElementById("lIFY").style.display = "initial";
        document.getElementById("lFFN").style.display = "initial";
        document.getElementById("lFFM").style.display = "initial";
        document.getElementById("lFFY").style.display = "initial";

    }
}

function buscar(form, event){

    event.preventDefault();
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost/practica2/rest/entrada/';
    let titulo = form.querySelector("p:first-of-type>input").value;
    let descripcion = form.querySelector("p:nth-of-type(2)>input").value;
    let autor = form.querySelector("p:nth-of-type(3)>input").value;
    let ini = form.querySelector("p:nth-of-type(4)>input").value;
    let fin = form.querySelector("p:nth-of-type(3)>input").value;
    let section = document.querySelector("section");
    let a = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if(a){
        let dI = document.getElementById("FiniFN").value;
        let mI = document.getElementById("FiniFM").value;
        let yI = document.getElementById("FiniFY").value;
        let dF = document.getElementById("FfinalFN").value;
        let mF = document.getElementById("FfinalFM").value;
        let yF = document.getElementById("FfinalFY").value;
        ini=yI+"-"+mI+"-"+dI;
        fin=yF+"-"+mF+"-"+dF;    }
    url = url + "?n=" + titulo + "&d=" + descripcion + "&l=" + autor + "&fi=" + ini + "&ff=" + fin ;
    xhr.open('GET', url, true);
    xhr.onload = function(){
        let v = JSON.parse(xhr.responseText);
        if(v.RESULTADO == 'ok'){
            totalBus = Math.round(v.FILAS.length/6);
            if(totalBus < v.FILAS.length/6){
                if (totalBus+0.5 > v.FILAS.length/6)
                    totalBus = totalBus+1;
            }

            while( fc = section.querySelector('h3+div>article') )
                fc.remove();
            
            let plantilla = section.querySelector('h3+div>template');

            let lon = numBus*6+6;
            if(lon > v.FILAS.length)
                lon = v.FILAS.length;

            for(let i=(numBus*6); i < lon ; i++){
                
                let e = v.FILAS[i];
                let foto = 'http://localhost/practica2/fotos/' + e.fichero;
                
                let elem = plantilla.content.cloneNode(true);
                
                elem.querySelector('p:first-of-type').innerHTML = '<b>'+e.nombre+'</b>';
                elem.querySelector('figure>img').src = foto;
                elem.querySelector('figure>img').alt = e.descripcion_foto;
                elem.querySelector('figure>figcaption').innerHTML = e.descripcion;
                elem.querySelector('p:nth-of-type(2)').innerHTML = '<b>Autor: </b>'+ e.login;
                elem.querySelector('p:nth-of-type(3)').innerHTML = '<b>Fecha de Publicación: </b>'+ e.fecha;
                elem.querySelector('p:nth-of-type(5)').innerHTML = e.ncomentarios + ' comentarios';
                elem.querySelector('p:nth-of-type(4)').innerHTML = e.nfotos + ' fotos';
                elem.querySelector('figure>a').href = "entrada.html?id="+e.id;    
                
                
               section.querySelector('h3:nth-of-type(2)+div').appendChild(elem);
            }
        }else{
            alert('ERROR de algun tipo');
        }
    }
    xhr.send();
}

function getEntrada(id){
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost/practica2/rest/entrada/';
    url += id;
    xhr.open('GET', url, true);
    xhr.onload = function(){
        let v = JSON.parse(xhr.responseText);
        if (v.RESULTADO == "ok"){
            let tit = document.querySelector("h3:first-of-type");
            tit.innerHTML = v.FILAS[0].nombre;
            let d = document.querySelector("article:first-of-type");
            let desc = d.querySelector("p:first-of-type");
            desc.innerHTML = v.FILAS[0].descripcion;
            let autor = d.querySelector("p:nth-of-type(2)");
            autor.innerHTML = "<b>Autor: </b>"+v.FILAS[0].login;
            let fecha = d.querySelector("p:nth-of-type(3)");
            fecha.innerHTML = "<b>Fecha de Publicación: </b>"+v.FILAS[0].fecha;
            let nfotos = d.querySelector("p:nth-of-type(4)>a");
            nfotos.innerHTML = "<b>Número de fotos: </b>"+v.FILAS[0].nfotos;
            let ncom = d.querySelector("p:nth-of-type(5)>a");
            ncom.innerHTML = "<b>Número de comentarios: </b>"+v.FILAS[0].ncomentarios;

        }

    }
    xhr.send();

}

function getFotos(id){
    let section = document.querySelector("section");
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost/practica2/rest/entrada/';
    url += id+"/fotos";
    xhr.open('GET', url, true);
    xhr.onload = function(){
        let v = JSON.parse(xhr.responseText);
        if(v.RESULTADO == 'ok'){
            
            let plantilla = section.querySelector('h3:nth-of-type(2)+div>template');

            for(let i=0; i < v.FILAS.length ; i++){
                
                let e = v.FILAS[i];
                let foto = 'http://localhost/practica2/fotos/' + e.fichero;
                
                let elem = plantilla.content.cloneNode(true);
                
                elem.querySelector("p:first-of-type").innerHTML = i+1;
                elem.querySelector("img").src = foto;
                elem.querySelector("p:nth-of-type(2)").innerHTML = e.texto;   
                
               section.querySelector('h3:nth-of-type(2)+div').appendChild(elem);
            }
        }else{
            alert('ERROR de algun tipo');
        }
    }
    xhr.send();
    
}

function getComent(id){
    let section = document.querySelector("section");
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost/practica2/rest/entrada/';
    url += id+"/comentarios";
    xhr.open('GET', url, true);
    xhr.onload = function(){
        let v = JSON.parse(xhr.responseText);
        if(v.RESULTADO == 'ok'){
            let plantilla = section.querySelector('h3:nth-of-type(3)+div+div>template');


            for(let i=0; i < v.FILAS.length ; i++){
                let e = v.FILAS[i];
                let elem = plantilla.content.cloneNode(true);

                elem.querySelector("p:first-of-type").innerHTML = e.login+" - ";
                elem.querySelector("p:nth-of-type(2)").innerHTML = e.fecha;
                elem.querySelector("p:nth-of-type(3)").innerHTML = e.titulo;
                elem.querySelector("p:nth-of-type(4)").innerHTML = e.texto;

                section.querySelector('h3:nth-of-type(3)+div+div').appendChild(elem);

            }

        }
    }
    xhr.send();

}

function Entrada(){
    let v = window.location.search;
    if (v!=""){
        let sp = v.split("=");
        let id = sp[1];
        document.getElementById("eFotos").href="entrada.html?id="+id+"#fotos";
        document.getElementById("eCom").href="entrada.html?id="+id+"#comentario";
        
        getEntrada(id);
        getFotos(id);
        getComent(id);
        addCom(id);
    }else{
        window.location.replace("index.html");
    }   

}

function addCom(id){
    if(sessionStorage.getItem('login') != null){
        document.getElementById("resp1").style.display = "none";
        let html = "<form action='entrada.html?id="+id+"#comentario' onsubmit='subirCom("+id+",event);' id='formCom' method='post'>";
        html+= "<p><input type='text' name='title' placeholder='Título' maxlength='50' required></p>"
        html += "<label >Comentario</label><p><textarea  name='coment'  rows='5' cols='20' required></textarea></p>"
        html+= "<input type='submit'value='Enviar Respuesta' ></form>"
        html += "<br>"
        document.querySelector("h3:nth-of-type(3)+div").innerHTML = html;
    }
}

function subirCom(id, event){
    event.preventDefault();
    let form = document.getElementById("formCom");
    let titulo = form.querySelector("p:nth-of-type(1)>input").value;
    let texto = form.querySelector("p:nth-of-type(2)>textarea").value;
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost/practica2/rest/comentario/';
    xhr.open('POST', url, true);
    var formdata = new FormData();
    formdata.append("login", sessionStorage.login);
    formdata.append("titulo", titulo);
    formdata.append("texto", texto);
    formdata.append("id_entrada", id);
    xhr.setRequestHeader("Authorization", sessionStorage.clave);
    xhr.onload = function(){
        let v = JSON.parse(xhr.responseText);
        if (v.RESULTADO == "ok"){
           mostrarMensajeCom(id); 
       }else{
            mostrarMensajeComError();
       }
    }
    xhr.send(formdata);
    
}

function responderCom(resp){
    if(sessionStorage.getItem('login') != null){
        let form = document.getElementById("formCom");
        let nombre = resp.parentNode.querySelector("p:nth-of-type(3)").innerHTML;
        let titulo = form.querySelector("p:nth-of-type(1)>input").value = "Re: "+ nombre;
        form.querySelector("p:nth-of-type(2)>textarea").focus();
        location.href="#comentario";
    }else{
        alert("Debe estar logueado para responder comentarios");
    }

}

/*<button>Responder</button>
                    <br>
                    <br>
                    <form action="entrada.html" method="post">
                    <p>
                        <input type="text" name="title" placeholder="Título" maxlength="50" required>
                    </p>
                    <label >Comentario</label>
                    <p>
                        <textarea  name="coment"  rows="5" cols="20" required>
                        </textarea>
                    </p>
                    <input type="submit" value="Enviar Respuesta" >
                    </form> */