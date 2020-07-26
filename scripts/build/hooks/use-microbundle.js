const { useCallback, useEffect, useState } = require("react");
const chokidar = require("chokidar");
const microbundle = require("microbundle");
const debounce = require("lodash.debounce");

function useMicrobundle() {
  const [changedFiles, setChangedFiles] = useState(new Set());
  const [buildStatus, setBuildStatus] = useState({
    loading: false,
    error: undefined,
    success: undefined,
  });

  const triggerBuild = useCallback(
    debounce(async () => {
      setBuildStatus({loading: true});

      try {
        const { output } = await microbundle({
          cwd: ".",
          formats: "umd",
        });
        setBuildStatus({loading: false, success: true});

        setTimeout(() => {
          setBuildStatus({loading: false});
        }, 2000)
      } catch (err) {
        setBuildStatus({loading: false, error: err.toString()});
      }
    }, 500),
    []
  );

  useEffect(() => {
    chokidar
      .watch("src/**/*", {
        ignoreInitial: true,
        atomic: true,
      })
      .on("all", (event, path) => {
        setChangedFiles(new Set([...changedFiles, path]));
        triggerBuild();
      });
  }, []);

  return { buildStatus, changedFiles };
}

module.exports = useMicrobundle;
