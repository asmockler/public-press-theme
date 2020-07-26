const React = require('react');
const { Box, Newline, Text } = require("ink");

function SectionBox({ children, title }) {
  return (
    <Box
      borderStyle="round"
      borderColor="#42438B"
      paddingX={1}
      flexDirection="column"
    >
      <Text bold>{title}</Text>
      {children}
    </Box>
  );
}

module.exports = SectionBox;
