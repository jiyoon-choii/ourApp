const btn = document.querySelector("#modal-btn");
const modal = document.querySelector("#modal");
const close = document.querySelector(".p_close");

// 모달창 열기
btn.onclick = function() {
  modal.style.display = "block";
}

// 모달창 닫기
close.onclick = function() {
  modal.style.display = "none";
}

// 모달 내용 저장
// Insere notas na base de dados
// function save() {
   
//     if ($("#review").val() == "") {
//       alert("Texto vazio");
//     } else {
//       $(document).ready(function () {
//         $.ajax({
//           method: "POST",
//           url: "/api/v1/places/history",
//           data: {
//             review: $("#review").val()
//           }
//         }).done(function (msg) {
//           if (msg == 1) {
//             //alert("Nota guardada com sucesso");
//             readyNotas(num);
//             console.log("func guardar done == 1");
//           } else {
//             alert("Erro: não foi possivel guardar");
//           }
//         });
//         texto.value = "";
//       });
//       console.log("func guardar ready");
//     }
//   }


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

document.addEventListener('DOMContentLoaded', async function() {

    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth'
    });
    calendar.render();
    
    let placeListRes = await getPlaces(getPlaceList)
    console.log(placeListRes)
  
    let data = placeListRes.data;
    for (let i = 0; i < data.length; i++) {
        console.log(data[i])
        let  str = 
        `<option value=${data[i].id}>${data[i].placeName}</option>`;
        
        $("#select-place").append(str)
      }

      $("#saveVisitedPlace").on( "click", async function() {
        await savePlace("http://35.230.26.44:8080/api/v1/places/history")
      } );




  });



    async function savePlace(url){
        // 분류 목록 불러오기
            
      let data = {placeId: parseInt($("#select-place").val()),
        visitedDatetime: $("#calendar-dt").val(),
        vehicle: $("#input-howtogo").val(),
        satisfaction: $(".radio-satisfac:checked").val(),
        wannaRevisit: $(".radio-revisit:checked").val(),
        //: $("#nput-review").val(),
        };

        console.log(data);
            let response;
            await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE 등
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            body: JSON.stringify({
              data
        }),
            }).then((res) =>  res.json())
            .then(res  => response = res);

            return response;
        }

