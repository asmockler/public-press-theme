const { useCallback, useEffect, useState, useRef } = require("react");
const { exec } = require("child_process");

function useThemekit() {
  const themekit = useRef();
  const [initialized, setInitialized] = useState(false);
  const [files, setFiles] = useState(null);

  useEffect(() => {
    themekit.current = exec("theme watch");
  }, []);

  useEffect(() => {
    if (themekit.current == null) {
      return;
    }

    function updateFiles(data, status) {
      let filename = data.split(" ");
      filename = filename[filename.length - 1];

      setFiles((files) => ({
        ...files,
        [filename]: status,
      }));
    }

    function handleData(data) {
      data
        .split("\n")
        .filter((line) => line.length > 0)
        .forEach((outputLine) => {
          if (outputLine.indexOf("Watching for file changes") > -1) {
            setInitialized(true);
          } else if (outputLine.indexOf("processing") > -1) {
            updateFiles(outputLine, "processing");
          } else if (outputLine.indexOf("Updated") > -1) {
            updateFiles(outputLine, "updated");
          } else {
            process.stdout.write(outputLine);
          }
        });
    }

    themekit.current.stdout.on("data", handleData);

    return () => {
      themekit.current.stdout.off("data", handleData);
    };
  }, [themekit, files]);

  useEffect(() => {
    let id = setTimeout(() => {
      if (files == null) {
        return;
      }

      if (Object.values(files).every((status) => status === "updated")) {
        setFiles(null);
      }
    }, 2000);

    return () => {
      clearTimeout(id);
    };
  }, [files]);

  return {
    initialized,
    files,
  };
}

module.exports = useThemekit;
