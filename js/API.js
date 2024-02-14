const loadPhone = async (phonename = 13, isShowall) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phonename}`);
    const data = await res.json();
    const phones = data.data
    //console.log(phones);
    displayPhones(phones, isShowall);
}
const displayPhones = (phones, isShowall) => {
    const PhoneContainer = document.getElementById('Phone-container');
    PhoneContainer.textContent = "";

    const showAll = document.getElementById("Show-All");
    if (phones.length > 12 && !isShowall) {
        showAll.classList.remove('hidden');

    } else {
        showAll.classList.add('hidden');
    }

    if (!isShowall) {
        phones = phones.slice(0, 12);
    }

    console.log("Is show all", isShowall
    )

    phones.forEach(phones => {
        console.log(phones);
        const phonecard = document.createElement('div');
        phonecard.classList = `card w-96 bg-lime-100 shadow-xl`;
        phonecard.innerHTML = `
<figure class="pt-5"><img src=${phones.image} />
</figure>
<div class="card-body">
    <h2 class="card-title">${phones.phone_name}</h2>
    <p>${phones.slug}</p>
    <div class="card-actions justify-center">
        <button onclick="handeleShowdetails('${phones.slug}')" class="btn btn-primary bg-lime-400 text-white ">Show Details</button>
    </div>
</div>
`;

        PhoneContainer.appendChild(phonecard);
    });
    togolspiner(false);
}
const handeleShowdetails = async (id) => {
    // console.log("click handel button", id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data);
    phonedetails = data.data

    showdailbox(phonedetails);

}

const showdailbox = async (phone) => {

    const phone_details_card = document.getElementById('Details_Phone');
    phone_details_card.innerHTML = `
 
 <img src=${phone.image}  class="object-none object-center">
 <div>
 <h2> ${phone.name}</h2>
 </div>
 <div>
 <h2> ${phone.releaseDate}</h2>
 </div>
 <div>
 <h2> ${phone.mainFeatures.memory}</h2>
 </div>
 
 
 `

    // const Phone_name = document.getElementById("show_dailbar_header");
    // Phone_name .innerText=phone.name;


    console.log(phone);
    handel_modal.showModal();




}

const searcHandel = (isShowall) => {

    const searchId = document.getElementById('searchId');
    const searchText = searchId.value;

    console.log(searchText);
    console.log("Find item")
    loadPhone(searchText, isShowall);
    togolspiner(true)
}

const togolspiner = (isloading) => {
    const loadingspiner = document.getElementById('loading-spinner')
    if (isloading) {
        loadingspiner.classList.remove('hidden')
    } else {
        loadingspiner.classList.add('hidden')
    }

}

const showhandel = () => {
    searcHandel(true);

}

loadPhone()

