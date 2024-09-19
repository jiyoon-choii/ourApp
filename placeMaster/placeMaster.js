function findAdd() {
    new daum.Postcode({
      oncomplete: function(data){
        let addr = '';

        if (data.userSelectedType === 'R') {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        $('#c_main_address').val(addr);
        //document.getElementById("#c_main_address").value = addr;

        //$('#c_main_address').val(splitAddr(addr)).

      }
    }).open();
  }

function splitAddr(fullAddr) {
  
  const splitAddrs = fullAddr.split(" ")

  const doo = splitAddrs[0];
  const sigungu = splitAddrs[1];    

  let result = {
    doo : doo,
    sigungu : sigungu
  }
  return 
}

  $(document).ready( async function() {
    
    const catPrimaryResponse = await loadCat("http://35.230.26.44:8080/api/v1/categories/primary?page=1&perPage=15")
    const catSecondaryResponse = await loadCat("http://35.230.26.44:8080/api/v1/categories/secondary?page=1&perPage=15")

    $("#saveBtn").on( "click", async function() {
      await savePlace("http://35.230.26.44:8080/api/v1/places")
    } );

    $("#closeBtn").click(function(){
      window.location.href = "http://127.0.0.1:5500/ourApp/placeMasterList/placeMasterList.html";
   });

   //const catPrimaryRes = await loadPlaceMasterList("http://35.230.26.44:8080/api/v1/places?page=1&perPage=15")

   //console.log(catPrimaryRes);

   
   let catPrimaryList = catPrimaryResponse.data;
   for(let i=0; i < catPrimaryList.length; i++) {
    console.log()
     let str = 
      `<option value=${catPrimaryList[i].id} ${catPrimaryList[i].catPCode}>${catPrimaryList[i].catPName}</option>`;
      $("#catPrimary").append(str)
      

   }


    }
  )

  async function loadCat(url){
    // 분류 목록 불러오기
    let result;

    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        },
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        return response.json();
      })
      .then((response) => {
        result = response;
      });
      return result;
    }
      
    /*
      const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE 등
        headers: {
          "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          }
      });

      return response;
    */


    ///


  async function savePlace(url){
    // 분류 목록 불러오기
      
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE 등
      headers: {
        "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      body: JSON.stringify({
        fullAddress: $("#c_main_address").val(),
        placeName: $("#placeName1").val(),
        theEnd: false,
        openTime: $("#openTime").val(),
        parking: $("input[name='parking']:checked").val(),
        popUp: $("input[name='popup']:checked").val(),
        refLink: $("#refLink").val(),
  }),
      });

      //Authorization: KakaoAK ${REST_API_KEY}

      window.location.href = "http://127.0.0.1:5500/ourApp/placeMasterList/placeMasterList.html";

      return response;
      
  }

