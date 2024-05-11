let classifier;
let img;

function readURL(input) {
    // 이전에 생성된 결과 텍스트가 있다면 제거
    if(document.querySelector(".res")){
        document.querySelector(".res").remove();
    }

    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            classifier = ml5.imageClassifier('MobileNet');
            img = loadImage(e.target.result, function() {
                // 이미지가 로드되면 분류 시작
                classifier.classify(img, gotResult);
            });
            document.getElementById('preview').src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}



function setup(){
}


function gotResult(err, res){
  results = res;
  console.log(res);
    if(err){
        console.log(err);
    } else {
        var newDiv = document.createElement("div");
        newDiv.classList.add("res");
        // span 요소 생성
        var newSpan = document.createElement("span");
        // 글자 크기 설정
        newSpan.style.fontSize = "50px"; // 원하는 글자 크기로 조절하세요.

        // 텍스트 내용 설정
        var newTextContent = "I think it's a/an " + res[0].label + "\n" + "I am " + Math.floor(res[0].confidence*100) + "% confident.";
      
        // createTextNode 대신 innerText 사용
        newSpan.innerText = newTextContent;

        // newDiv에 newSpan 추가
        newDiv.appendChild(newSpan);

        document.body.insertBefore(newDiv, document.getElementById("preview").nextSibling);
    }
}