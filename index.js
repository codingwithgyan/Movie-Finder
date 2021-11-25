window.addEventListener("load", function () {
    let btn = document.getElementById("search_btn");
    btn.addEventListener("click", function () {
      let input = document.getElementById("search").value;
      if (input != "") {
        let url = "https://omdbapi.com/?apikey=cee3f810&s=" + input;

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
            let url = "https://omdbapi.com/?apikey=cee3f810&i=" + id;
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