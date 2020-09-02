const express = require("express");
const router = express.Router();

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));

const Url = require("../models/url");

/**
 * Add Url
 * @param String alias
 * @param String url To be redirect
 * @param Boolean enabled
 */

router.post("/add_url", async (req, res) => {
  console.log(req.body);

  let alias = req.body.alias;
  const urlRedirect = req.body.urlRedirect;
  const enabled = req.body.enabled;

  if (alias == undefined || alias == null || alias == "") {
    alias = Math.floor(Math.random * 10000 + 1);
  }

  let existUrl = await Url.findOne({ alias: alias });

  if (existUrl) return res.send({ success: false, err: "URL_ALREADY_EXISTS" });

  const url = new Url({
    alias: alias,
    urlRedirect: urlRedirect,
    enabled: enabled || true
  });

  return url.save(err => {
    if (err) console.error(err);

    if (err) return res.send({ success: false, data: url.toJSON(), err: err });
    else return res.send({ success: true });
  });
});

/**
 * Get Redirect Url
 *
 * @param String alias
 * @return String redirecturl
 */

router.post("/get_redirect_url", async (req, res) => {
  const alias = req.body.alias;

  const url = await Url.findOne({ alias: alias });
  if (url) return res.send({ success: true, redirect_url: url.urlRedirect });
  else return res.send({ success: false, err: "URL_NOT_EXISTS" });
});

/**
 * Add Visitor
 *
 * @param String alias
 */

router.post("/add_visitor", (req, res) => {
  const alias = req.body.alias;

  return Url.findOne({ alias: alias }, (err, url) => {
    if (!url) return res.send({ success: false, err: "URL_NOT_EXISTS" });
    else if (url) {
      url.visitor++;
      return url.save(err => {
        return res.send({ success: false, err: err });
      });
    } else if (err) return res.send({ success: false, err: err });
  });
});

/**
 * Get all urls
 *
 */

module.exports = router;
