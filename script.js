let type=document.getElementById("type");
let filterByType=document.getElementById("filterByType");
let reset=document.getElementById("reset");
let filterByName=document.getElementById("name");
let outputScreen=document.getElementById("outputScreen");
let loading=true;
let loaderElement=document.getElementById("loaderElement");

filterByType.addEventListener('click',function()
{
    fetchPokemon(type.value,"")
})
reset.addEventListener('click',function()
{
    fetchPokemon("","");
    type.value="";
})
filterByName.addEventListener('keyup',function()
{
    fetchPokemon("",filterByName.value)

})

let colors={
    grass:"#009A17",
    fire:"#e25822",
    water:"#d4f1f9",
    bug:"#94bc4a",
    normal:"#aab09f",
    poison:"#b468b7",
    electric:"#e5c531",
    ground:"#cc9f4f",
    fairy:"#e397d1"

    
}
//  console.log(colors.grass);

async function fetchPokemon(type="",name="") {
    let data=[];
    outputScreen.innerHTML=" ";
    if(loading)
    {
        loaderElement.style.display="block"
    }
    for (let i = 1; i <= 100; i++) {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
       let item=await response.json();
       data.push(item);
      
      
    }
    
    generateCard(data,type,name);
  }
 function generateCard(data,type,name)
 {
    loading=!loading;
    {
        loaderElement.style.display="none"
    }
    data.filter((ele)=>
    {
        if(type!="" )
        {
            return ele.types[0].type.name===type;

        }
        else if(name!="" )
        {
            return ele.name.includes(name) || ele.types[0].type.name.includes(name);
        }
        else{
            return ele;
        }
        

    }).forEach(element => {
        console.log(element);
        // console.log(element.types[0].type.name)
        let div=document.createElement("div");
        div.innerHTML=`
            <div class="id">
                <h5>${element.id}</h5>
            </div>
            <div class="image">
                <img src="${element.sprites.front_default}"/>
            </div>
            <div class="name">
                <p>${element.name}</p>
            </div>
            <div class="type">
                <p>${element.types[0].type.name}</p>
            </div>
        `
        //console.log(element.types[0].type.name);
        div.classList.add("card");
        // let typee=element.types[0].type.name;
       div.style.backgroundColor=`${colors[element.types[0].type.name]}`;
    
        outputScreen.appendChild(div);               
    });

 } 
fetchPokemon();