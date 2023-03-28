function isValid() {
   const dobElement = document.getElementById("dob");
   const dobValue = dobElement.value;
   const dobDate = new Date(dobValue);
   const today = new Date();
   const ageInMilliseconds = today - dobDate;
   const ageInYears = ageInMilliseconds / (365 * 24 * 60 * 60 * 1000);
   const isValidAge = ageInYears >= 18 && ageInYears <= 55;
   
   if (!isValidAge) {
     dobElement.setCustomValidity("The age should be between 18 and 55 years");
     dobElement.reportValidity();
   } else {
     dobElement.setCustomValidity("");
   }
 }
 

let userform = document.getElementById("user-form");

const EntriesRetrieved = ()=> {
   let entries = localStorage.getItem("user-entries");
   if(entries){
      entries=JSON.parse(entries);
   }
   else{
      entries=[]
   }
   return entries;
}

let ue=EntriesRetrieved();

const displayEntries = ()=>
{
   const entries=EntriesRetrieved();
   const tableEntries =entries.map((entry)=>{
      const a1= `<td class='border px-5 py-2'>${entry.name}</td>`;
        const a2= `<td class='border px-5 py-2'>${entry.email}</td>`;
        const a3= `<td class='border px-5 py-2'>${entry.password}</td>`;
        const a4= `<td class='border px-5 py-2'>${entry.dob}</td>`;
        const a5= `<td class='border px-5 py-2'>${entry.atc}</td>`;
        const r= `<tr>${a1} ${a2} ${a3} ${a4} ${a5}</tr>`;
        return r;
   }).join("\n");

   const table= `<table class="table-auto w-full"><tr>
    <th class="px-5 py-2">Name</th>
    <th class="px-5 py-2">Email</th>
    <th class="px-5 py-2">Password</th>
    <th class="px-5 py-2">Dob</th>
    <th class="px-5 py-2">Accepted terms?</th>
    </tr>${tableEntries} </table>`;
    let details=document.getElementById("user-entries");
    details.innerHTML = table;

   
}
const saveUserform = (event) =>{
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const atc = document.getElementById('acceptTerms').checked;

    const entry={
       name,
       email,
       password,
       dob,
       atc
    };
    ue.push(entry);

    localStorage.setItem("user-entries",JSON.stringify(ue));
    displayEntries();
}

userform.addEventListener("submit",saveUserform);
displayEntries();