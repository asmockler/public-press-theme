const React = require("react");
const { Box, Text } = require("ink");
const Gradient = require("../../forked-ink-pkgs/ink-gradient");
const BigText = require("ink-big-text");

function Banner() {
  return (
    <Box flexDirection="column" alignItems="center" marginBottom={1}>
      <Gradient name="vice">
        <BigText font="tiny" text="Public Press" />
      </Gradient>

      <Box marginTop={-1}>
        <Text italic>THEME DEVELOPMENT</Text>
      </Box>
    </Box>
  );
}

module.exports = Banner;
