import axios from 'axios';

export default function createPdf(uni, name, primaryMajor, studentId) {


    const objectToSendOver = {
      uni: uni,
      name : name.trim(),
      primaryMajor: primaryMajor.trim(),
      studentId: studentId.trim()
    };

    axios.post("http://localhost:5000/getpdf/create-pdf", objectToSendOver)
    .then(function (response) {
    }).catch(function(error) {
      console.log(error);
    })
    
    const fileName = name.trim() + " " + uni.university + ".pdf";

    const downloadFile = () => {
      axios.get("http://localhost:5000/getpdf/get-pdf",   
      { responseType: 'arraybuffer',
        params: {
            fileName: fileName
          }, 
      }).then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]
          , {type: "application/pdf"}))
        var link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
      })
   }

    return setTimeout(() => downloadFile(), 1500) // 1.5 second delay for python script to fully run
    
}