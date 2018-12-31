// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
var auth = firebase.auth();
const messaging = firebase.messaging();
// // const messaging = firebase.messaging();
// const messaging = firebase.messaging();

// messaging.requestPermission().then(function() {
// 	console.log('Notification permission granted.');
// 	return messaging.getToken()
// }).then(function(currentToken) {
// 	console.log('currentToken', currentToken);
// }).catch(function(err) {
// 	console.log('Unable to get permission to notify.', err);
// });



function signUp() {
// alert('ok')
    // var name = document.getElementById('name').value;
    var email = document.getElementById('email1').value;
    var pwd = document.getElementById('pwd1').value;

    auth.createUserWithEmailAndPassword(email, pwd)
        .then(function(res){
            // console.log(res);
            db.collection('users').doc(res.user.uid).set({
                email : res.user.email
            });
        })
        .then(async function(){
            alert('SignUp Succecfully :^)');
            window.location.assign('login.html');
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            alert('SignUp UnSuccecfully ;(');
            // ...
        });

       
}



function signIn() {

    var email = document.getElementById('email').value;
    var pwd = document.getElementById('pwd').value;

    console.log(email, pwd);

    firebase.auth().signInWithEmailAndPassword(email, pwd)
        .then((res) => {
            console.log(res);

            //getting token of user
            messaging.requestPermission().then(function() {
                console.log('Notification permission granted.');
                return messaging.getToken()
            }).then(function(currentToken) {
                tokken = currentToken
                console.log('61',tokken);
                localStorage.setItem('token',tokken)
                db.collection('users').doc(res.user.uid).set({
                    token : tokken
                },{merge: true}).then(function(r){
                    console.log('64',r)
                });
            })
            // .then(async function(){
            //     // alert('LogIn Succecfully :)');
            //     window.location.assign('../index.html');
            // })
            .catch(function(err) {
                console.log('Unable to get permission to notify.', err);
            });

            console.log('Uid-----', res.user.uid)

            localStorage.setItem('uid',res.user.uid);
            var currentuid= localStorage.getItem('uid');
            console.log('geting uid in local storage====',currentuid)
        })
            

        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // ...
                alert(error.message);
        });

        logOut()
}

function logOut(){

    var uid = localStorage.getItem('uid');
    console.log(uid);

}



// +++++++++++++++++  ADD SEction ++++++++++++++

function submitAd(){
    var db = firebase.firestore();
    // var title = document.getElementById('AddTitle').value;
    var category= document.getElementById('AddCategory').value;
    var name = document.getElementById('addName').value;
    var number = document.getElementById('addNumber').value;
    var rate = document.getElementById('rate').value;
    var discription = document.getElementById('discription').value;
    
    // console.log('this is Ad==',
    //     category,name,number,rate,discription
    // )

 

    



    var load=document.getElementById('load')
uploading()
function uploading(){
    
    var storageRef = firebase.storage().ref();
    // var imageRef = storageRef.child('mountains.jpg');
    var fileName ='images/mountains'+Math.random().toString().substring(2,6)+'.jpg'
    var ImageRef = storageRef.child(fileName);
    console.group('image ref====',ImageRef)
    var file = document.getElementById('pic').files[0];
    //==== adding file
    ImageRef.put(file).then(function(snapshot) {
        
    
    load.setAttribute("id","load1")

    
      console.log('Uploaded a blob or file!');
    //===== getting url
    if(localStorage.getItem('uid')!=null){
      ImageRef.getDownloadURL().then(function(url){
        //   console.log('Url----',url)

        //   adding url in database
          db.collection('Ads').add({
            
            category: category,
            name:name,
            number:number,
            url:url,
            dis:discription,
            rate:rate,
            ownerid:localStorage.getItem('uid'),
            
        
        }).then (async()=>{
            
            alert("Add Succesfully Submited")}
        ).then(async()=>{
            window.location.assign('../index.html')}
            
        )
      })}
      else{
          alert('Plaese login first..');
          window.location.assign('login.html')
          load.setAttribute("id","load1")
      }
    });
   }


}

showData();
function showData(){
    db.collection('Ads')
.onSnapshot((snapshot) => {
    snapshot.forEach((doc) => {
        // console.log(
        //     doc.data().name,
        //     // doc.data().title,
        //     doc.data().category,
        //     doc.data().number,
        //     doc.data().url
        // )
    })
})
}


function propertyRent(){
    localStorage.setItem('menu', "PropertyRent")  
    localStorage.setItem('ifAds','selective')
}
function propertySell(){
    localStorage.setItem('menu', "PropertySell")
    localStorage.setItem('ifAds','selective')
}
function Animals(){
    
    localStorage.setItem('menu', "Animal");
    localStorage.setItem('ifAds','selective')
}
function Vihicles(){
    localStorage.setItem('menu', "Vihicles");
    localStorage.setItem('ifAds','selective')
    
}
function Bikes(){
    localStorage.setItem('menu', "Bikes");
    localStorage.setItem('ifAds','selective')
    
}
function Electronics(){
    localStorage.setItem('menu', "Electronics");
    localStorage.setItem('ifAds','selective')
}
function Mobiles(){
    localStorage.setItem('menu', "Mobiles");
    localStorage.setItem('ifAds','selective')
}
function Jobs(){
    localStorage.setItem('menu', "Jobs");
    localStorage.setItem('ifAds','selective')
}
function Services(){
    localStorage.setItem('menu', "Services");
    localStorage.setItem('ifAds','selective')
}
function Industrial(){
    localStorage.setItem('menu', "Industrial");
    localStorage.setItem('ifAds','selective')
}
function farniture(){
    localStorage.setItem('menu', "furniture");
    localStorage.setItem('ifAds','selective')
}
function Books(){
    localStorage.setItem('menu', "Books");
    localStorage.setItem('ifAds','selective')
}
function fashion(){
    localStorage.setItem('menu', "Fashion");
    localStorage.setItem('ifAds','selective')
}
function Kids(){
    localStorage.setItem('menu', "Kids");
    localStorage.setItem('ifAds','selective')
}


// searching section*****************
function searching(){
    var searching=document.getElementById('mysearching').value.toUpperCase()

var propertysell=['PROPERTYSELL','PROPERTY SELL','SELL','PROPERTY FOR SELL','PROPERTYFORSELL','SEL','SE','PROPERTY']
var propertyrent=['PROPERTYFORRENT','RENT','PROPERTI','RE','RENT','PROPERTY FOR RENT','FOR RENT','FOR RE']
var cars=['CAR','CA','VIHICLES','VHI','TOOL','CARS','VIHICLE']
var bike=['BIKE','BIK','BIKES','BI','BAIKE']
var home = ['ELECTRONICS','APPLIANCES','APPLIANCE','ELECTRONIC','ELEC','ELECTRO','ELECTRONICSANDHOMEAPPLIANCES','ELECTRONIC&HOMEAPPLIANCE','ELECTRONICS AND HOMEAPPLIANCES','ELECTRONIC AND HOMEAPPLIANCE ']
var mobi=['MOB','MOBILE','SAMSUNG','SAMSUNGS','IPHONE','NOKIA','Q MOBILE','QMOBILE']
var job=['JOB','JO','JOBES']
var ser=['SEVICES', 'SERVICE','SER','SERVIC','SE']
var biz=['BUSENESS INDUSTRIAL & AGRICULTURE','BUSENESSINDUSTRIALANDAGRICULTURE','BUSENESSINDUSTRIAL&AGRICULTURE','BUSENESS','BUSENESS INDUSTRIAL','AGRICULTURE','BUSEN','INDUS','AGRICUL']
var furnitur=['FURNITURE AND HOME DECURATION','FURNITUREANDHOMEDECURATION','HOME DECURATION','FURNITURE AND HOME DECOR','FURNITURE','FURNITURES','DECURATIONS']
var animal=['ANIMALS','ANI','ANIMAL','CAT','DOG','CATS', 'DOGES']
var book=['BOOKS','BOOK','SPORT','SPAORTS','HOBBISES','HOBBIES','HOBI','SPO','BOO',]
var fashan=['BEAUTY','BEAU','BEAUTIES','FASHION','FASH','FASHION AND']
var kids=['KI',"KID",'KIDS']

for(i=0; i<propertysell.length; i++){
//    console.log("agaya")
   if(searching==propertysell[i]){
    localStorage.setItem('menu', 'PropertySell')
    localStorage.setItem('ifAds','selective')
    window.location.assign('next/addshow.html')
    
   }
}


for(i=0; i<propertyrent.length; i++){
    // console.log("agaya")
    if(searching==propertyrent[i]){
     localStorage.setItem('menu', 'PropertyRent')
     localStorage.setItem('ifAds','selective')
     window.location.assign('next/addshow.html')
     
    }
 }

 for(i=0; i<cars.length; i++){
    // console.log("agaya")
    if(searching==cars[i]){
     localStorage.setItem('menu', 'Vihicles')
     localStorage.setItem('ifAds','selective')
     window.location.assign('next/addshow.html')
     
    }
 }

 for(i=0; i<bike.length; i++){
    // console.log("agaya")
    if(searching==bike[i]){
     localStorage.setItem('menu', 'Bikes')
     localStorage.setItem('ifAds','selective')
     window.location.assign('next/addshow.html')
     
    }
 }

 for(i=0; i<home.length; i++){
    // console.log("agaya")
    if(searching==home[i]){
     localStorage.setItem('menu', 'Electronics')
     localStorage.setItem('ifAds','selective')
     window.location.assign('next/addshow.html')
     
    }
 }

 for(i=0; i<mobi.length; i++){
    // console.log("agaya")
    if(searching==mobi[i]){
     localStorage.setItem('menu', 'Mobiles')
     localStorage.setItem('ifAds','selective')
     window.location.assign('next/addshow.html')
     
    }
 }

 for(i=0; i<ser.length; i++){
    // console.log("agaya")
    if(searching==ser[i]){
        localStorage.setItem('menu', 'Services')
        localStorage.setItem('ifAds','selective')
        window.location.assign('next/addshow.html')
     
    }
 }

 for(i=0; i<job.length; i++){
    // console.log("agaya")
    if(searching==job[i]){
        localStorage.setItem('menu', 'Jobs')
        localStorage.setItem('ifAds','selective')
        window.location.assign('next/addshow.html')
     
    }
 }


 for(i=0; i<biz.length; i++){
    // console.log("agaya")
    if(searching==biz[i]){
        localStorage.setItem('menu', 'Industrial')
        localStorage.setItem('ifAds','selective')
        window.location.assign('next/addshow.html')
     
    }
 }

 for(i=0; i<furnitur.length; i++){
    // console.log("agaya")
    if(searching==furnitur[i]){
        localStorage.setItem('menu', 'furniture')
        localStorage.setItem('ifAds','selective')
        window.location.assign('next/addshow.html')
     
    }
 }

 for(i=0; i<animal.length; i++){
    // console.log("agaya")
    if(searching==animal[i]){
        localStorage.setItem('menu', 'Animal')
        localStorage.setItem('ifAds','selective')
        window.location.assign('next/addshow.html')
     
    }
 }

 for(i=0; i<book.length; i++){
    // console.log("agaya")
    if(searching==book[i]){
        localStorage.setItem('menu', 'Books')
        localStorage.setItem('ifAds','selective')
        window.location.assign('next/addshow.html')
     
    }
 }

 for(i=0; i<fashan.length; i++){
    // console.log("agaya")
    if(searching==fashan[i]){
        localStorage.setItem('menu', 'Fashion')
        localStorage.setItem('ifAds','selective')
        window.location.assign('next/addshow.html')
     
    }
 }
 for(i=0; i<kids.length; i++){
    // console.log("agaya")
    if(searching==kids[i]){
        localStorage.setItem('menu', 'Kids')
        localStorage.setItem('ifAds','selective')
        window.location.assign('next/addshow.html')
     
    }
 }
}














// function category(g){
//    var g= db.collection('Ads').where('category', '==', menu)
//    return g
// }

// function fvrt1(){
//     var g= db.collection('Ads').where('fvrt', '==', localStorage.getItem('uid'))
   
//  }

function stfvrt(){
    localStorage.setItem('ifAds','fvrt')
}

if(localStorage.getItem('ifAds')=='selective'){
    getServices()

}
else if(localStorage.getItem('ifAds')=='fvrt'){
    getServices1() 
    console.log(document.getElementById('services'))
    return cache.put('url', 'response')
    
}
function getServices() {
   var menu= localStorage.getItem('menu')
console.log("function k andr===",menu)
db.collection('Ads').where('category', '==', menu)
    .onSnapshot((snapshot) => {
    snapshot.forEach((doc) => {
        // console.log(doc.data())

       


            var ads = document.getElementById('services');

            var noOfdiv = document.createElement('div');

            var adimg= document.createElement('div')
            var aditem = document.createElement('div')

            var img_1 = document.createElement('img');
            var h1_1 = document.createElement('h1');
            var p_1 = document.createElement('p');

            var addmsg = document.createElement('div')
            var h2_1 =document.createElement('h2');
            var span1 = document.createElement('span')
            var span2 =document.createElement('span')
            var imgmsg = document.createElement('img')
            var imgmsg_z = document.createElement('img')
            var imgfvt= document.createElement('img')

            span2.setAttribute('class','span')
            addmsg.setAttribute('class','Addmsg')
            adimg.setAttribute('class','adimg')
            aditem.setAttribute('class','aditem')

            imgmsg.setAttribute('src','../img/msg.png')
            imgmsg.setAttribute('id','img1')
            imgmsg.setAttribute( 'width','40px')

            
            

            imgfvt.setAttribute('src','../img/fvt.png')
            imgfvt.setAttribute('id','img2')
            imgfvt.setAttribute( 'width','30px')

            
            span1.appendChild(imgmsg_z)
            span1.appendChild(imgmsg)
            span2.appendChild(imgfvt)

            img_1.setAttribute('src',doc.data().url)
            h1_1.innerHTML=doc.data().name;
            p_1.innerHTML=doc.data().dis;
            h2_1.innerHTML='Rs '+doc.data().rate;
             
            addmsg.appendChild(h2_1);
            addmsg.appendChild(span1);
            addmsg.appendChild(span2);
            
            
            adimg.appendChild(img_1)
            aditem.appendChild(h1_1)
            aditem.appendChild(p_1)
            aditem.appendChild(addmsg)

            noOfdiv.appendChild(adimg)
            noOfdiv.appendChild(aditem)

            noOfdiv.setAttribute('class','noOfdiv')
            
            imgmsg.setAttribute('addid',doc.id)
            imgmsg.setAttribute('owner',doc.data().ownerid)
            imgmsg.setAttribute('onclick','msg(this)')
            
            imgfvt.setAttribute('addid',doc.id)
            imgfvt.setAttribute('owner',doc.data().ownerid)
            imgfvt.setAttribute('onclick','fvt(this)')

            ads.appendChild(noOfdiv)


            // console.log
    })
    // console.log(doc.id)
})
}


function getServices1() {
    var menu= localStorage.getItem('menu')
 console.log("function k andr===",menu)
 db.collection('Ads').where('fvrt', '==', localStorage.getItem('uid'))
     .onSnapshot((snapshot) => {
     snapshot.forEach((doc) => {
         // console.log(doc.data())
 
        
 
 
             var ads = document.getElementById('services');
 
             var noOfdiv = document.createElement('div');
 
             var adimg= document.createElement('div')
             var aditem = document.createElement('div')
 
             var img_1 = document.createElement('img');
             var h1_1 = document.createElement('h1');
             var p_1 = document.createElement('p');
 
             var addmsg = document.createElement('div')
             var h2_1 =document.createElement('h2');
             var span1 = document.createElement('span')
             var span2 =document.createElement('span')
             var imgmsg = document.createElement('img')
             var imgmsg_z = document.createElement('img')
             var imgfvt= document.createElement('img')
 
             span2.setAttribute('class','span')
             addmsg.setAttribute('class','Addmsg')
             adimg.setAttribute('class','adimg')
             aditem.setAttribute('class','aditem')
 
             imgmsg.setAttribute('src','../img/msg.png')
             imgmsg.setAttribute('id','img1')
             imgmsg.setAttribute( 'width','40px')
 
             
             
 
             imgfvt.setAttribute('src','../img/fvt.png')
             imgfvt.setAttribute('id','img2')
             imgfvt.setAttribute( 'width','30px')
 
             
             span1.appendChild(imgmsg_z)
             span1.appendChild(imgmsg)
             span2.appendChild(imgfvt)
 
             img_1.setAttribute('src',doc.data().url)
             h1_1.innerHTML=doc.data().name;
             p_1.innerHTML=doc.data().dis;
             h2_1.innerHTML='Rs '+doc.data().rate;
              
             addmsg.appendChild(h2_1);
             addmsg.appendChild(span1);
             addmsg.appendChild(span2);
             
             
             adimg.appendChild(img_1)
             aditem.appendChild(h1_1)
             aditem.appendChild(p_1)
             aditem.appendChild(addmsg)
 
             noOfdiv.appendChild(adimg)
             noOfdiv.appendChild(aditem)
 
             noOfdiv.setAttribute('class','noOfdiv')
             
             imgmsg.setAttribute('addid',doc.id)
             imgmsg.setAttribute('owner',doc.data().ownerid)
             imgmsg.setAttribute('onclick','msg(this)')
             
             imgfvt.setAttribute('addid',doc.id)
             imgfvt.setAttribute('owner',doc.data().ownerid)
             imgfvt.setAttribute('onclick','fvt(this)')
 
             ads.appendChild(noOfdiv)
 
 
             // console.log
     })
    //  
 })
fvtofline()
 }
 function fvtofline(){
     console.log('me agaya')
 }
// +++++++++++++++++  ADD SEction ++++++++++++++

var msgload=document.getElementById('msgload')
function msg(a){
    msgload.setAttribute('id','msgload1')
    
   var adid=a.getAttribute('addid');
   var owner=a.getAttribute('owner');
   var buyer=localStorage.getItem('uid')
     localStorage.setItem('adid',adid)
     localStorage.setItem('owner',owner)
     
      localStorage.setItem('run','ok')
     
//    console.log('addid===',adid,'buyer id==',buyer,'owner==',owner)

db.collection('mychat').doc(adid).set({
    adid:adid,
    onwer:owner,
    buyer:buyer
}).then(async ()=>{

    window.location.assign('inbox.html')
})




}


function fvt(a){
    
    
   var adid=a.getAttribute('addid');
   var owner=a.getAttribute('owner');
   localStorage.getItem('uid')
    
db.collection('Ads').doc(adid).update({
    fvrt:localStorage.getItem('uid')
})


}





// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var storage = firebase.storage();






function uploading(){
 
var storageRef = firebase.storage().ref();
// var imageRef = storageRef.child('mountains.jpg');
var fileName ='images/mountains'+Math.random().toString().substring(2,6)+'.jpg'
var ImageRef = storageRef.child(fileName);
console.group('image ref====',ImageRef)
var file = document.getElementById('pic').files[0];
//==== adding file
ImageRef.put(file).then(function(snapshot) {
  console.log('Uploaded a blob or file!');
//===== getting url
  ImageRef.getDownloadURL().then(function(url){
    //   console.log('Url----',url)
  })
});
}




function sendmsg(){

    
var adid=localStorage.getItem('adid')
   var owner=localStorage.getItem('owner')
   var buyer=localStorage.getItem('uid')
   var sendmsg=document.getElementById('sendInpu').value
   
   db.collection('mychat').where('buyer', '==', buyer).where('adid', '==', adid).where('onwer','==',owner)
    .onSnapshot((snapshot) => {
    snapshot.forEach((doc) => {
        var db_adid=doc.data().adid
        // console.log( db_adid)
        db.collection('mychat').doc(adid).collection('msg').doc('"'+new Date().getTime()+'"').set({
            buyer:sendmsg,
            sender:'hellow',
            uid:localStorage.getItem('uid')
        });
        db.collection('users').doc(localStorage.getItem('owner')).get().then(function(res){
            console.log('667 CHECK THIS ',res.data().token);


            messaging.onMessage((payload) => {
                console.log('payload', payload)
            })
            
            
            //Way to push notification using fetch!
            
            
            //Server Key (Firebase -> Project -> Settings -> Cloud Messaging -> Server Key
            var key = 'AIzaSyCdr_wY3DBE5hmYIHikzLVnk26nMny97T4';
            //token
            var to = res.data().token;
            var notification = {
            	'title': 'You have one new massage',
                'body': 'Assalam o Alikum',
                'icon':'https://static.bn-static.com/img-48593/olx-share.jpg'
                
            };
            
            fetch('https://fcm.googleapis.com/fcm/send', {
            	'method': 'POST',
            	'headers': {
            		'Authorization': 'key=' + key,
            		'Content-Type': 'application/json'
            	},
            	'body': JSON.stringify({
            		'notification': notification,
            		'to': to
            	})
            }).then(function(response) {
            	console.log(response);
            }).catch(function(error) {
            	console.error(error);
            });
        }) ;

        
    })
    
})




    
//  .then( async ()=>{ location.reload()})
    
}

function getingmsg(){
    var showmsg=document.getElementById('showChatmsg');
    var pthis =document.createElement('p')
    var adid=localStorage.getItem('adid')
    db.collection('mychat').doc(adid).collection('msg')
    .onSnapshot((snapshot)=>{
showmsg.innerHTML = "";
        snapshot.forEach((doc)=>{
            // console.log(doc.data().buyer)
            showmsg.appendChild(pthis)


            // var sendmsg=document.getElementById('sendInpu').value
// console.log(sendmsg)



var divmsg=document.createElement('div');
var chatp=document.createElement('p')

console.log(doc.data().uid==localStorage.getItem('uid'))
if(doc.data().uid==localStorage.getItem('uid')){
    divmsg.setAttribute('class','noOfmsg1');
    chatp.setAttribute('class','chatmsg2');
}
else{
    divmsg.setAttribute('class','noOfmsg');
chatp.setAttribute('class','chatmsg1');
}
chatp.innerHTML=doc.data().buyer;

divmsg.appendChild(chatp)


showmsg.appendChild(divmsg)

// dltvalue()
document.getElementById('sendInpu').value=''
window.scrollTo(0,document.body.scrollHeight);
        })
    })
}





// function fvrt(a){
//     fvrtitem(a)
//     var fvrt=a.getElementsByClassName('noOfdiv')
//     console.log(fvrt.innerHTML)
//     // document.getElementById('fvrtdiv').innerHTML=fvrt

// }



// TODO add service worker code here
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }








