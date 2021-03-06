
window.addEventListener("load", function () {
  displayTrend();
  var searc_btn=document.getElementById("search");
  searc_btn.addEventListener("input",function(){
    debounce(displayMovies,500);
  });
    let btn = document.getElementById("search_btn");
    btn.addEventListener("click", function () {
      let input = document.getElementById("search").value;
      let box=document.getElementById("box");
      box.style.display="none";
      if (input != "") {
        let url = `https://omdbapi.com/?apikey=cee3f810&s=` + input;

        async function getData() {
          try {
            let res = await fetch(url);
            let data = await res.json();
            data = data.Search;
            if (data.length == 0) noData();
            else {
              display(data);
            }
          } catch (e) {
            noData();
          }
        }
        getData();
      } else {
        noData();
      }
    });

  });

  function display(data) {
    var container = document.getElementById("container");
    container.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
      var div1 = document.createElement("div");
      div1.setAttribute("value", i);
      div1.setAttribute("class", "poster");
      div1.style.cursor = "pointer";
      var div2 = document.createElement("div");
      var img = document.createElement("img");
      var name = data[i].Poster;
      if (name == "N/A") {
        name =
          "https://st2.depositphotos.com/3732989/5330/i/450/depositphotos_53304205-stock-photo-no-image-available.jpg";
      }
      img.setAttribute("src", name);
      img.setAttribute("class", "img");
      div2.append(img);
      var div3 = document.createElement("div");
      div3.innerHTML = data[i].Title;
      div3.setAttribute("class", "txt");
      var div4 = document.createElement("div");
      div4.setAttribute("class", "txt");
      div4.innerHTML = data[i].Year;

      div1.append(div2, div3, div4);
      container.append(div1);
    }

    //////////////////////////////////////////////

    var poster = document.getElementsByClassName("poster");

    for (var i = 0; i < poster.length; i++) {
      poster[i].addEventListener("click", function () {
        let index = +this.getAttribute("value");

        async function getMoreData() {
          try {
            let id = data[index].imdbID;
            let url = `https://omdbapi.com/?apikey=cee3f810&i=` + id;
            var res = await fetch(url);
            var more_data = await res.json();
            console.log(more_data);
            ////////////////////////////////////////////////////
            var body = document.querySelector("body");
            var div = document.createElement("div");
            div.setAttribute("id", "details");
            var button = document.createElement("button");
            button.innerHTML = "X";
            button.setAttribute("id", "close");

            button.addEventListener("click", function () {
              var details_div = document.getElementById("details");
              details_div.remove();
            });
            div.append(button);
            var div2 = document.createElement("div");
            div2.setAttribute("id", "details_div1");
            var img = document.createElement("img");
            img.style.height = "100%";
            img.style.width = "100%";
            img.setAttribute("src", data[index].Poster);
            div2.append(img);

            var div3 = document.createElement("div");
            div3.setAttribute("id", "details_div2");
            var h2 = document.createElement("h2");
            h2.innerHTML =
              data[index].Title + " &nbsp;(" + data[index].Year + ")";
            var h4 = document.createElement("h4");
            var rating=+more_data.imdbRating;
            if(rating>8.5)
            {
              var recommend=document.createElement("h4");
              recommend.innerHTML="Recommended";
              recommend.setAttribute("class","recommend");
              div3.append(recommend);
            }
            h4.innerHTML = rating;
            var h5 = document.createElement("h5");
            h5.innerHTML =
              "Director : " +
              more_data.Director +
              "<br/>Writer : " +
              more_data.Writer +
              "<br>Actor : " +
              more_data.Actors +
              "<br/>Plot : " +
              more_data.Plot +
              "<br>Language : " +
              more_data.Language +
              "<br/>Awards : " +
              more_data.Awards;
            div3.append(h2, h4, h5);
            div.append(div2, div3);
            body.append(div);
            //////////////////////////////////////
          } catch (e) {
            console.log(e);
          }
        }

        getMoreData();
      });
    }
  }

  function noData() {
    let container = document.getElementById("container");
    container.innerHTML = "";

    let img = document.createElement("img");
    img.setAttribute(
      "src",
      "https://i.pinimg.com/originals/11/dc/96/11dc96d2e4daca3ea8ff6aa41299b5e1.gif"
    );
    img.setAttribute("id", "error_img");
    container.append(img);
  }
  async function searchMovies()
  {
    let key="";
    let name=document.getElementById("search").value;
    
      let url=`https://omdbapi.com/?apikey=cee3f810&s=${name}`;
      let res=await fetch(url);
      let data=await res.json();
      if(data.Response=="True")
      {
        return data;
      } 
  }

  async function displayMovies()
  {
    let box=document.getElementById("box");
    let name=document.getElementById("search").value;
    if(name.length==0)
    {
      box.style.display="none";
    }
    let movie_data=await searchMovies();
    
    if(movie_data===undefined)
    {
      return false;
    }
    
    box.style.display="flex";
   box.innerHTML="";
    for(var i=0;i<movie_data.Search.length;i++)
    {

      let div1=document.createElement("div");
      div1.setAttribute("class","inner_box");
  
      let div2=document.createElement("div");
      let img=document.createElement("img");
      var poster = movie_data.Search[i].Poster;
      if (poster == "N/A") {
        poster =
          "https://st2.depositphotos.com/3732989/5330/i/450/depositphotos_53304205-stock-photo-no-image-available.jpg";
      }
      img.setAttribute("src",poster);
      img.setAttribute("class","inner_img");
      div2.append(img);
  
      let div3=document.createElement("div");
      let a1=document.createElement("a");
      a1.setAttribute("class","inner_txt");
      a1.innerHTML=movie_data.Search[i].Title;
      div3.append(a1);
  
      div1.append(div2,div3);
      box.append(div1);
    }

  }
let bomb;
  function debounce(func,delay)
  {
    clearInterval(bomb);
    bomb=setTimeout(function(){
        func();
    },delay);
  }
  async function getTrend(url)
  {
      let res=await fetch(url);
      let data=await res.json();
      return data.results;
  }
  async function displayTrend()
  {
    let url=`https://api.themoviedb.org/3/trending/all/day?api_key=858a23f2ce58fe1ba8cf3c8721c6973a`;
    let data=await getTrend(url);
    if(data==undefined)
    {
      return false;
    }
    console.log(data);

    //////////////////////////////////////////////////////

    var container = document.getElementById("container");
    container.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
      if(data[i].original_title!=undefined)
      {
        var div1 = document.createElement("div");
      div1.setAttribute("value", i);
      div1.setAttribute("class", "poster");
      div1.style.cursor = "pointer";
      var div2 = document.createElement("div");
      var img = document.createElement("img");
      var name = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/"+data[i].poster_path;
      if (name == "N/A") {
        name =
          "https://st2.depositphotos.com/3732989/5330/i/450/depositphotos_53304205-stock-photo-no-image-available.jpg";
      }
      img.setAttribute("src", name);
      img.setAttribute("class", "img");
      div2.append(img);
      var div3 = document.createElement("div");
      div3.innerHTML = data[i].original_title;
      div3.setAttribute("class", "txt");
      var div4 = document.createElement("div");
      div4.setAttribute("class", "txt");
      div4.innerHTML = data[i].release_date;

      div1.append(div2, div3, div4);
      container.append(div1);
      }
      
    }
  }