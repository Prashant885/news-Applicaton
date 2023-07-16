let ur=" https://gnews.io/api/v4/search?q=";
let apik="6249813957516e7eac07d649ac371347";

window.addEventListener("load",()=>fetchNews("virat kohli"));
async function fetchNews(query){
const res=await fetch(`${ur}${query}&apikey=${apik}`);
const dta=await res.json();
binddata(dta.articles);
}
function binddata(articles){
    let cardcontainer=document.getElementById("card-container");
    let cardtemplate=document.getElementById("template-news-card");
    cardcontainer.innerHTML=" ";
    articles.forEach(dataa => {
        if(!dataa.image)return;
        let cardclone=cardtemplate.content.cloneNode(true);
        fillContent(cardclone,dataa);
        cardcontainer.appendChild(cardclone);
        
    });}
    function fillContent(cardclone,dataa){
        const newsimg=cardclone.querySelector("#news-img");
        const newstitle =cardclone.querySelector("#news-title");
        const newsdate=cardclone.querySelector("#news-src");
        const newsdesc=cardclone.querySelector("#news-desc");
        newsimg.src=dataa.image;
       
        newstitle.innerHTML=dataa.title;
        newsdesc.innerHTML=dataa.description;
        const src=dataa.source.name;
        const date=new Date(dataa.publishedAt).toLocaleString("en-us",{
            timeZone:"Asia/Jakarta"
        });

        newsdate.innerHTML= src+" . "+date;

        newsdesc.innerHTML=dataa.description;
        cardclone.firstElementChild.addEventListener("click",()=>{
            window.open(dataa.url,"_blank");

        })
    }
    var curSelected=null;
    function navitem(id){
        
        fetchNews(id);
        curSelected?.classList.remove('active');

        let curnav=document.getElementById(id);
            curSelected=curnav;
            curSelected.classList.add('active');
       
    }
let inpquery=document.getElementById("input-query");
let button=document.getElementById("button");
button.addEventListener("click" ,()=>{
    let q=inpquery.value;
    if(!q)return;

fetchNews(q);
curSelected?.classList.remove("active");
curSelected=null;
})

const nav_link=document.getElementById("nav-links");
const menutoggle=document.getElementById("menu-toggle");
menutoggle.addEventListener("click",()=>{
    nav_link.classList.toggle("active");
    if(nav_link.classList.contains("active")){
       const cardcont= document.getElementById("card-container");
        cardcont.classList.add("toggle-margin");

    }
    if(!nav_link.classList.contains("active")){
        const cardcont= document.getElementById("card-container");
        if(cardcont.classList.contains("toggle-margin")){
            cardcont.classList.remove("toggle-margin");
           
        }
        
    }

})



if(window.innerWidth<=500){
    const menucont=document.getElementById("menu-cont");
    menutoggle.addEventListener("click",()=>{
        menucont.classList.toggle("activv");
        if(menucont.classList.contains("activv")){
           const cardcont= document.getElementById("card-container");
            cardcont.classList.add("togglle-margin");
            const inpsize=document.getElementById("input-query");
            inpsize.style.width="50%";
           
        }
        if(!menucont.classList.contains("activv")){
            const cardcont= document.getElementById("card-container");
            if(cardcont.classList.contains("togglle-margin")){
                cardcont.classList.remove("togglle-margin");
    
            }
        }
    
    })
}

