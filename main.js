//
// Place any custom JS here
//

const getData = () => {
  const idInstance = document.getElementById("idInstance").value;
  const ApiTokenInstance = document.getElementById("ApiTokenInstance").value;
  const msgWid = document.getElementById("msgWid").value;
  const message = document.getElementById("message").value;
  const urlWid = document.getElementById("urlWid").value;
  const urlFile = document.getElementById("urlFile").value;
  return { idInstance: idInstance, ApiTokenInstance: ApiTokenInstance, urlWid: urlWid, msgWid: msgWid, urlFile: urlFile, message: message };
};

const sendMessage = async () => {
  const { idInstance, ApiTokenInstance, msgWid, message } = getData();
  const url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${ApiTokenInstance}`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chatId: msgWid,
      message: message,
    }),
  };

  await postData(url, options);
};

const sendFileByURL = async () => {
  const { idInstance, ApiTokenInstance, urlWid, urlFile } = getData();
  const url = `https://api.green-api.com/waInstance${idInstance}/sendFileByUrl/${ApiTokenInstance}`;
  const fileName = url.substring(urlFile.lastIndexOf("/") + 1);
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chatId: urlWid,
      urlFile: urlFile,
      fileName: fileName,
    }),
  };

  await postData(url, options);
};

const getSettings = async () => {
  const { idInstance, ApiTokenInstance } = getData();
  const msgWid = document.getElementById("msgWid");
  const urlWid = document.getElementById("urlWid");
  await fetch(
    `https://api.green-api.com/waInstance${idInstance}/getSettings/${ApiTokenInstance}`
  )
    .then((res) => res.json())
    .then((json) => {
      responseField.innerText = JSON.stringify(json, "", "\t");
      msgWid.value = json.wid;
      urlWid.value = json.wid;
    });
};

const getStateInstance = async () => {
  const { idInstance, ApiTokenInstance } = getData();
  const url = `https://api.green-api.com/waInstance${idInstance}/getStateInstance/${ApiTokenInstance}`;
  const options = {};
  await postData(url, options);
};

const postData = async (url, options) => {
  const responseField = document.getElementById("responseField");
  await fetch(url, options)
    .then((res) => res.json())
    .then((json) => (responseField.innerText = JSON.stringify(json, "", "\t")));
};
