import Head from "next/head";
import { useState } from "react";

function Home() {
  const [instanceVars, setInstanceVars] = useState("");
  const [gands, setGands] = useState("");

  function generateGAndS() {
    if (!instanceVars) return;
    setGands("");
    generateGetter(instanceVars);
    generateSetter(instanceVars);
  }

  function generateGetter(instanceVars) {
    let instanceVarsSplit = instanceVars.split("\n");
    for (let i = 0; i < instanceVarsSplit.length; i++) {
      const instanceVar = instanceVarsSplit[i];
      let type = instanceVar.split(" ")[1];
      let name = instanceVar.split(" ")[2];
      name = name.slice(0, name.length - 1);
      const getterName = `get${name.charAt(0).toUpperCase() + name.slice(1)}`;
      const getter = `public ${type} ${getterName}() {\n\treturn this.${name};\n}`;
      setGands((gands) => gands ? gands + `\n\n` + getter : getter);
    }
  }

  function generateSetter(instanceVars) {
    let instanceVarsSplit = instanceVars.split("\n");
    for (let i = 0; i < instanceVarsSplit.length; i++) {
      const instanceVar = instanceVarsSplit[i];
      let type = instanceVar.split(" ")[1];
      let name = instanceVar.split(" ")[2];
      name = name.slice(0, name.length - 1);
      const setterName = `set${name.charAt(0).toUpperCase() + name.slice(1)}`;
      const setter = `public ${type} ${setterName}(${type} ${name}) {\n\tthis.${name} = ${name};\n}`;
      setGands((gands) => gands + `\n\n` + setter);
    }
  }

  return (
    <>
      <Head>
        <title>Java Getter And Setter Generator</title>
      </Head>
      <div className="m-2 p-4">
        <div className="flex items-center justify-center w-full flex-col gap-6">
          <div className="flex items-center justify-center gap-4 w-full h-fit">
            <textarea
              onChange={(e) => {
                setInstanceVars(e.target.value);
              }}
              value={instanceVars ? instanceVars : ""}
              name="instanceVars"
              id="instanceVars"
              cols={30}
              rows={10}
              className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="private String name;"
            ></textarea>
            <textarea
              onChange={(e) => {
                setGands(e.target.value);
              }}
              value={gands ? gands : ""}
              name="gands"
              id="gands"
              cols={30}
              rows={10}
              className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={`public String getName() {\n\treturn name;\n}\n\npublic void setName(String name) {\n\tthis.name = name;\n}`}
            ></textarea>
          </div>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
            onClick={generateGAndS}
          >
            Generate!
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
