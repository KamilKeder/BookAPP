var input_nazwa = document.querySelector("#input_nazwa");
var button_szukaj = document.querySelector("#button_szukaj");
var tbody_wyniki = document.querySelector("#tbody_wyniki")
button_szukaj.addEventListener("click",szukaj);
function szukaj() {
	var div_wyniki = document.getElementById("div_wyniki");
	div_wyniki.classList.remove("ukryty");
	fetch("https://wolnelektury.pl/api/books/")
	.then(res => res.json())
	.then(res => {
		for(let nazwa of res){
			var zmienna_lokalna1;
			var zmienna_lokalna2;
			var nazwa_title = nazwa.title;
			var nazwa_author = nazwa.author;
			var nazwa_titleN = nazwa_title.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			var nazwa_authorN = nazwa_author.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			var nazwa_titleNM = nazwa_title.toLowerCase();
			var nazwa_authorNM = nazwa_author.toLowerCase();

			var wartosc = input_nazwa.value
			var wartoscD = wartosc.toLowerCase();
			var wartoscM = wartosc.toLowerCase();


			var wartoscN = wartosc.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			var wartoscND = wartoscD.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			var wartoscNM = wartoscM.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

			if(nazwa_title.includes(wartosc)||nazwa_author.includes(wartosc)||
			nazwa_author.includes(wartoscD)||nazwa_title.includes(wartoscD)||
			nazwa_author.includes(wartoscM)||nazwa_title.includes(wartoscM)||
			nazwa_author.includes(wartoscN)||nazwa_title.includes(wartoscN)||
			nazwa_author.includes(wartoscNM)||nazwa_title.includes(wartoscNM)||
			nazwa_author.includes(wartoscND)||nazwa_title.includes(wartoscND)||
			nazwa_titleN.includes(wartosc)||nazwa_authorN.includes(wartosc)||
			nazwa_authorN.includes(wartoscD)||nazwa_titleN.includes(wartoscD)||
			nazwa_authorN.includes(wartoscM)||nazwa_titleN.includes(wartoscM)||
			nazwa_authorN.includes(wartoscN)||nazwa_titleN.includes(wartoscN)||
			nazwa_authorN.includes(wartoscNM)||nazwa_titleN.includes(wartoscNM)||
			nazwa_authorN.includes(wartoscND)||nazwa_titleN.includes(wartoscND)||

			nazwa_authorNM.includes(wartoscD)||nazwa_titleNM.includes(wartoscD)||
			nazwa_authorNM.includes(wartoscM)||nazwa_titleNM.includes(wartoscM)||
			nazwa_authorNM.includes(wartoscN)||nazwa_titleNM.includes(wartoscN)||
			nazwa_authorNM.includes(wartoscNM)||nazwa_titleNM.includes(wartoscNM)||
			nazwa_authorNM.includes(wartoscND)||nazwa_titleNM.includes(wartoscND)

			){
			var zmienna_lokalna3 = nazwa.url
		zmienna_lokalna3 = zmienna_lokalna3.replace("https://wolnelektury.pl/katalog/lektura/", "");
				zmienna_lokalna1 +=
		`
		<tr>
			<th>
				<img src="https://wolnelektury.pl/media/${nazwa.cover}">
			</th>
			<th>
				${nazwa.author}
			</th>
			<th>
				${nazwa.title}
			</th>
			<th>
				${nazwa.epoch}
			</th>
			<th>
				${nazwa.genre}
			</th>
			<th>
				<button class='btn btn-warning' onclick="showModal('${nazwa.url}','${nazwa.title}','${nazwa.epoch}','https://wolnelektury.pl/media/${nazwa.cover}','${nazwa.kind}','${nazwa.genre}','${nazwa.author}','${zmienna_lokalna3}')">Sprawdź</button>
			</th>
		</tr>
		`;


}}
if (zmienna_lokalna1 == null) {
  	alert("Niepoprawna nazwa, spróbuj ponownie.")
  }
  else{
  if (zmienna_lokalna1.includes("undefined")) {
  	zmienna_lokalna1 = zmienna_lokalna1.replace("undefined","");
  	tbody_wyniki.innerHTML = zmienna_lokalna1;
  }}
})}


var modalWrap = null;
const showModal = (numer, nazwa, epoka, okladka, rodzaj, gatunek, autor, opis) =>{
 if (modalWrap !== null) {
    modalWrap.remove();
  }
  fetch("https://wolnelektury.pl/api/books/"+opis)
	.then(rew => rew.json())
	.then(rew => {
		var zmienna_lokalna2 = rew.fragment_data.html
  modalWrap = document.createElement('div');
  modalWrap.innerHTML = `
    <div class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-light">
            <h5 class="modal-title">${nazwa}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="div_body">
            <img id="img_modal" src="${okladka}">
            <div id='div_info'>
           <h5 class="mt-0 mb-0">Autor</h5>
            <p>${autor}</p>
          <h5 class="mt-0 mb-0">Epoka</h5>
            <p>${epoka}</p>
            <h5 class="mt-0 mb-0">Rodzaj</h5>
            <p>${rodzaj}</p>
            <h5 class="mt-0 mb-0">Gatunek</h5>
            <p>${gatunek}</p>

          </div>
          	<h5 class="mt-3 mb-1">Cytat z książki</h5>
            ${zmienna_lokalna2}
          </div>
          <div class="modal-footer bg-light">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zamknij</button>
            <button type="button" class="btn btn-primary modal-success-btn" data-bs-dismiss="modal" onclick="window.open('${numer}','_blank').focus()">Więcej Informacji</button>
          </div>
        </div>
      </div>
    </div>
  `;


  document.body.append(modalWrap);
  var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
  modal.show();

  })}

