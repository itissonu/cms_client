import { useRef, useState } from "react";
import { Box, Grid } from "@mui/material";
import { Editor } from "@monaco-editor/react";

import LanguageSelector from "../compoenets/LanguageSelector";
import Output from "../compoenets/Output";
import { CODE_SNIPPETS } from "../utils/constant";

const Example = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (

    <div className="p-10 flex">
    <Box className='w-[100%]'>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="75vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Output editorRef={editorRef} language={language} />
        </Grid>
      </Grid>
    </Box>
    </div>
  );
};

export default Example;
