const React = require("react");
const importJsx = require("import-jsx");
const { render, Box, Text } = require("ink");
const { default: Spinner } = require("ink-spinner");

const Banner = importJsx("./components/Banner");
const SectionBox = importJsx("./components/SectionBox");
const useThemekit = require("./hooks/use-themekit");
const useMicrobundle = require("./hooks/use-microbundle");

function App() {
  const { initialized, files } = useThemekit();
  const { buildStatus } = useMicrobundle();

  return (
    <Box flexDirection="column">
      <Banner />

      <SectionBox title="Microbundle">
        {buildStatus.loading ? (
          <Text>
            <Text color="#DC6DA4">
              <Spinner type="dots" />
            </Text>{" "}
            Build running...
          </Text>
        ) : buildStatus.error ? (
          <Box>
            <Text bold color="red">×</Text>
            <Box flexGrow={1} marginLeft={1}>
              <Text>{buildStatus.error}</Text>
            </Box>
          </Box>
        ) : buildStatus.success ? (
          <Text>
            <Text color="green">✔</Text> Build succeeded!
          </Text>
        ) : (
          <Text>Listening for changes</Text>
        )}
      </SectionBox>
      <SectionBox title="Themekit">
        {initialized ? (
          <Box flexDirection="column">
            {files == null ? (
              <Text>Listening for changes</Text>
            ) : (
              Object.entries(files).map(([filename, status]) => {
                return status === "processing" ? (
                  <Text key={filename}>
                    <Text color="#DC6DA4">
                      <Spinner type="dots" />
                    </Text>{" "}
                    {filename}
                  </Text>
                ) : (
                  <Text key={filename}>
                    <Text color="green">✔</Text> {filename}
                  </Text>
                );
              })
            )}
          </Box>
        ) : (
          <Text>
            <Text color="#DC6DA4">
              <Spinner type="dots" />
            </Text>{" "}
            Initializing...
          </Text>
        )}
      </SectionBox>
    </Box>
  );
}

render(<App />);
