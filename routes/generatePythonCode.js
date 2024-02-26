var express = require("express");
const path = require("path");

var router = express.Router();

// 路由设置
router.post("/generate-python-file", (req, res) => {
  const pythonCode = nunjucks.render(
    path.join(__dirname, "/template/testCase.njk"),
    req.body.values.content
  );

  return res.json({
    code: pythonCode,
  });
});


module.exports = router;
