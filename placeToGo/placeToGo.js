
/*
var form = document.getElementById("form-id");

document.getElementById("form-id").addEventListener("click", function () {
  form.submit();
});
*/

const url = "http://35.230.26.44:8080/api/v1/places/togo"
async function savePlace(url){
  let result ;
  await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE 등
    headers: {
      "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    body: JSON.stringify({
      why: $("#resonTogo").val(),
      wannaVisitDatetime: $("#pickDatetime").val(),
      references: $("#refLink").val(),
      placeId: parseInt($("#placeNameTogo option:selected").val())
      }),
      
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      return response.json();
    })
    .then((response) => {
      result=response;
    })
     

    return result;
}


const getPlaceList = "http://35.230.26.44:8080/api/v1/places?page=0&perPage=100"
async function getPlaces(url){    
  let result ;
  await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE 등
      headers: {
        "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
  
        return response.json();
      })
      .then((response) => {
        result=response;
      });
      return result;
}


$(document).ready( async function() {
  let placeListRes = await getPlaces(getPlaceList)
  console.log(placeListRes)

  let data = placeListRes.data;
  for (let i = 0; i < data.length; i++) {
      console.log(data[i])
      let  str = 
      `<option value=${data[i].id}>${data[i].placeName}</option>`;
      
      $("#placeNameTogo").append(str)
    }

  $("#saveBtn").on( "click", async function() {
    await savePlace(url)
  } );

  // just for the demos, avoids form submit
  jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
  });
  $( "#form-id" ).validate({
    rules: {
      field: {
        required: true
      }
    }
  });

  }
)