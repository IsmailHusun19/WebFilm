const search = () =>{
    const inputSearch  = document.getElementsByClassName("input-search")[0];
    const btnSearch = document.getElementsByClassName("btn-search")[0];

    btnSearch.addEventListener("click", () =>{
        $.ajax({
            url : 'https://www.omdbapi.com/?apikey=621c8a56&S=' + inputSearch.value,
            success : berhasil => {
                const film = berhasil.Search;
                console.log(film);
                getData(film);
            },
            error : (gagal) => {
                console.log(gagal.responseText);
            }
        });
    });
}

search();





const getData = (film) => {
    const divRow = document.getElementsByClassName('row')[2];
    divRow.innerHTML = "";
    for (const dataFilm of film) {
        const divCol = document.createElement('div');
        divCol.className = "col-md-4 my-3";
        divRow.appendChild(divCol)

        const divCard = document.createElement('div');
        divCard.className = "card";
        divCol.appendChild(divCard);

        const img = document.createElement('img');
        img.className = "card-img-top";
        img.src = dataFilm.Poster;
        divCard.appendChild(img);

        const divCardBody = document.createElement('div');
        divCardBody.className = "card-body";
        divCard.appendChild(divCardBody);

        const h5 = document.createElement('h5');
        h5.className = "card-title";
        h5.innerHTML = dataFilm.Title;
        divCardBody.appendChild(h5);

        const h6 = document.createElement('h6');
        h6.className = "card-subtitle mb-2 text-muted";
        h6.innerHTML = dataFilm.Year;
        divCardBody.appendChild(h6);

        const a = document.createElement('a');
        a.className = "btn btn-primary btn-details"
        a.setAttribute("data-toggle", "modal");
        a.setAttribute("data-target", "#filmDetailModal");
        a.innerHTML = "Show Detail";
        divCardBody.appendChild(a);
        a.href = "#";
        a.onclick = function (){
            showDetail(dataFilm.imdbID);
        }
    }
}


const showDetail = idFilm =>{
    $.ajax({
        url : "https://www.omdbapi.com/?apikey=621c8a56&i=" + idFilm,
        success : data => {
            const modalBody = document.getElementsByClassName('modal-body')[0];
            modalBody.innerHTML = "";
            modalBody.innerHTML = `<div class="container-fluid">
                                        <div class="row">
                                        <div class="col-md-3">
                                            <img src="${data.Poster}" class="img-fluid">
                                        </div>
                                        <div class="col-md">
                                            <ul class="list-group">
                                            <li class="list-group-item"><h4>${data.Title}</h4></li>
                                            <li class="list-group-item"><strong>Sutradara : </strong>${data.Director}</li>
                                            <li class="list-group-item"><strong>Aktor : </strong>${data.Actors}</li>
                                            <li class="list-group-item"><strong>Penulis : </strong>${data.Writer}</li>
                                            <li class="list-group-item"><strong>Plot : </strong> <br> ${data.Plot}</li>
                                            </ul>
                                        </div>
                                        </div>
                                    </div>`
        },
        error : (gagal) => {
            console.log(gagal.responseText);
        }
    })
}
