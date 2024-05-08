async function main(){
  // var models = await getAvailableModels("API");
  // await getNewestModel(models);
  //await checkAssistantExist("", "API");
  await createAssistant({code: "CS101", name: "Introduction to Computer Science"}, "API", "gpt-3.5-turbo", 1.0);
  }

  async function createAssistant(subject, api, model, temp) {
    const modelName = model; // Specify the model name here
    var url, requestOptions;
      url = 'https://api.openai.com/v1/assistants';
      requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${api}`,
          'OpenAI-Beta': 'assistants=v2'
        },
        body: JSON.stringify({
            model: modelName,
            name: `${subject.code} Assistant`,
            instructions :`You are a personal tutor in FPT University, your task is to help students with their study, homework, and assignments. You can answer questions, provide explanations, and give examples. You can also help students with ${subject.code} - ${subject.name}. You can provide feedback, suggestions, and guidance. You can help students with their subjects. You can help students with their English, writing, reading, and grammar. You can help students with their computer science, programming, algorithms, data structures, databases, and software engineering. You can help students with their web development, mobile development, game development, and other projects. You can help students with their research, analysis, and writing. You can help students with their presentations, speeches, and debates. You can help students with their exams, quizzes, and tests. It is your job to review student\'s answers on EduNext platform, giving feedback based on your knowledge.`,
            tools: [{ type: "code_interpreter" }, {type: "file_search"}],
            temperature: temp,
            model: modelName
        })
      };
    return fetch(url, requestOptions)
      .then(response => response.json()).then(data => {console.log(data); subject.id = data; return subject})
      .catch(error => {
        console.error(label.error.message, error);
        return null;
      });
  }

  async function checkAssistantExist(modelID, api){
    const url = 'https://api.openai.com/v1/assistants';
    var request = {
      method: "GET",
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api}`,
        'OpenAI-Beta': 'assistants=v2'
      }};

      fetch(url, request)
      .then(response => response.json())
      .then(data => {
        if(data.data.some(model => model.id == modelID)) {
          console.log("Assistant exists");
          return true;
        } else {
          console.log("Assistant does not exist");
          return false;
        }
      })
      .catch(error => {
        console.error(label.error.message, error);
        return null;
      });
  }

async function getAvailableModels(api){
  const url = 'https://api.openai.com/v1/models';
  var request = {
    method: "GET",
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api}`
    }
  }
  return fetch(url, request).then(response => response.json()).then(data => {console.log(data); return data;})
  .catch(error => {
    console.error(label.error.message, error);
    return null;
  });
}

async function getNewestModel(models){
  let gptModels = models.data.filter(model => model.id.startsWith("gpt"));
  if(gptModels.length > 0) {
    let maxCreatedModel = gptModels.reduce((max, model) => max.created > model.created ? max : model);
    console.log(maxCreatedModel.id);
    chrome.storage.sync.set({"MODEL": maxCreatedModel.id})
  } else {
    console.log("No models found with id starting with 'gpt'");
  }
}

window.onload = main();