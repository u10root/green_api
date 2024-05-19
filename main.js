//
// Place any custom JS here
//

const getData = () => {
  const idInstance = document.getElementById("idInstance").value;
  const ApiTokenInstance = document.getElementById("ApiTokenInstance").value;
  const chatId = document.getElementById("chatId").value;
  const message = document.getElementById("message").value;
  const urlFile = document.getElementById("urlFile").value;
  return { idInstance: idInstance, ApiTokenInstance: ApiTokenInstance, chatId: chatId, urlFile: urlFile, message: message };
};

const sendMessage = async () => {
  const { idInstance, ApiTokenInstance, chatId, message } = getData();
  const url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${ApiTokenInstance}`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chatId: chatId,
      message: message,
    }),
  };

  await postData(url, options);
};

const sendFileByURL = async () => {
  const { idInstance, ApiTokenInstance, chatId, urlFile } = getData();
  const url = `https://api.green-api.com/waInstance${idInstance}/sendFileByUrl/${ApiTokenInstance}`;
  const fileName = url.substring(urlFile.lastIndexOf("/") + 1);
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chatId: chatId,
      urlFile: urlFile,
      fileName: fileName,
    }),
  };

  await postData(url, options);
};

const getSettings = async () => {
  const { idInstance, ApiTokenInstance } = getData();
  const chatId = document.getElementById("chatId");
  await fetch(
    `https://api.green-api.com/waInstance${idInstance}/getSettings/${ApiTokenInstance}`
  )
    .then((res) => res.json())
    .then((json) => {
      responseField.innerText = JSON.stringify(json, "", "\t");
      chatId.value = json.wid;
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
