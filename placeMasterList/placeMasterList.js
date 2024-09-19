$(document).ready( async function() {

    const catPrimaryRes = await loadPlaceMasterList("http://35.230.26.44:8080/api/v1/places?page=0&perPage=15")

    //console.log(catPrimaryRes);

    
    let placeList = catPrimaryRes.data;
    for(let i=0; i < placeList.length; i++) {
      let refStr ;
      if(!placeList[i].refLink){
        refStr = ""
      } else{
        refStr = "참조링크"
      }
      let jsonData = 
        `<tr>
            <th scope="row">${placeList[i].id}</th>
            <td scope="">${placeList[i].placeName}</td>
            
            <td scope="">도</td>
            <td scope="">시/군/구</td>
            <td scope="">장소대분류</td>
            <td scope="">${placeList[i].categoryS.catSName}</td>
            <td scope=""><a href=${placeList[i].refLink}>${refStr}</a></td>
          </tr>`;
        $("#dataTableBody").append(jsonData)
      
    }
    
    

    // let testData = new Object();
    // testData.body = {
    //     "page": 1,
    //     "perPage": 15,
    //     "totalPage": 1,
    //     "totalCount": 2,
    //     "data": [
    //       {
    //         "id": 1,
    //         "fullAddress": "수영구 380번길 1층",
    //         "placeName": "라스트춘선",
    //         "refLink": "http://naver.com"
    //       },
    //       {
    //         "id": 2,
    //         "fullAddress": "수영구 380번길 5층",
    //         "placeName": "역전할맥",
    //         "refLink": "http://naver.com"
    //       }
    //     ]
    //   }
    //   console.log(testData);
    // let data = testData.body.data;
    // for (let i = 0; i < data.length; i++) {
    //     console.log(data[i])
    //     let  str = 
    //     `<tr>
    //         <th scope="row">${data[i].id}</th>
    //         <td scope="">${data[i].placeName}</td>
    //         <td scope="">${data[i].fullAddress}</td>
    //         <td scope="">장소 대분류</td>
    //         <td scope="">장소 중분류</td>
    //         <td scope=""><a href=${data[i].refLink}>참조링크</a></td>
    //      </tr>`;
    //     $("#dataTableBody").append(str)
    //   }

})

async function loadPlaceMasterList(url){
    // 분류 목록 불러오기
      
  let result ; 

  await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE 등
    headers: {
      "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
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