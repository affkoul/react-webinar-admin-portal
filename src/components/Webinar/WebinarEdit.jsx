import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

// material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Button, MenuItem } from "@material-ui/core";

// material-ui/pickers
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import { Editor } from "@tinymce/tinymce-react";

// components
import LinkWrapper from "components/Link/LinkWrapper";
import TextFieldWrapper from "components/Input/TextFieldWrapper";
import AlertResponse from "components/AlertResponse/AlertResponse";
import SelectWrapper from "components/Input/SelectWrapper";

// utils
import api from "utils/api";
import { getWebinarTiers, getWebinarTypes } from "utils/commonUtils";

// jalali
import JalaliUtils from "@date-io/jalaali";
import jMoment from "moment-jalaali";

import MomentUtils from "@date-io/moment";
import "moment/locale/en-au";

// jalali initiate
// jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const useStyle = makeStyles((theme) => ({
  root: { direction: "ltr" },
  container: {
    padding: theme.spacing(1),
  },
  submit: {
    marginRight: theme.spacing(1),
  },
  fileInput: {
    display: "none",
  },
  featuredImage: {
    maxWidth: "100%",
    maxHeight: "200px",
  },
  childWebinarCategory: {
    paddingLeft: theme.spacing(5),
  },
  grandChildWebinarCategory: {
    paddingLeft: theme.spacing(10),
  },
}));

function WebinarEdit() {
  const classes = useStyle();
  const history = useHistory();
  const { id } = useParams();

  const [serverError, setServerError] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState(new Date());
  const [featuredImage, setFeaturedImage] = useState("");
  const [description, setDescription] = useState("");
  const [tier, setTier] = useState("");
  const [duration, setDuration] = useState("");
  const [type, setType] = useState("");
  const [link, setLink] = useState("");
  const [webinarCategoryList, setWebinarCategoryList] = useState([]);

  useEffect(() => {
    const getWebinar = () => {
      console.log("ID", id);
      api
        .getWebinar({
          urlParams: {
            id,
          },
        })
        .then((res) => {
          const webinar = res.data;
          setName(webinar.name);
          setPrice(webinar.price);
          setCategory(webinar.category);
          setTime(webinar.username);
          setFeaturedImage(webinar.featuredImage);
          setDescription(webinar.description);
          setTier(webinar.tier);
          setDuration(webinar.duration);
          setType(webinar.type);
          setLink(webinar.link);
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            setServerError(err.response.data.message);
          }
        });
    };

    if (id) {
      getWebinar();
    }
  }, [id]);

  useEffect(() => {
    const getWebinarCategoryList = () => {
      api
        .getWebinarCategoryList()
        .then((res) => {
          setWebinarCategoryList(res.data);
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            setServerError(err.response.data.message);
          }
        });
    };

    getWebinarCategoryList();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("inja");
    setServerError(null);
    api
      .patchPostWebinar({
        urlParams: { id },
        data: {
          name,
          price,
          category,
          time,
          featuredImage,
          description,
          tier,
          duration,
          type,
          link,
        },
      })
      .then(() => {
        console.log("here?");
        history.push(`/webinar`);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setServerError(err.response.data.message);
        }
      });
  };

  const postUploadImage = (b64Image) => {
    api
      .postUploadImage({ data: { image: b64Image } })
      .then((res) => {
        setFeaturedImage(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setServerError(err.response.data.message);
        }
      });
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      postUploadImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Paper className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h5">
                {id ? `Edit Webinar` : `New Webinar`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {featuredImage && (
                <img
                  alt="Image"
                  src={featuredImage}
                  className={classes.featuredImage}
                />
              )}
            </Grid>

            <Grid item xs={12}>
              <label htmlFor="file-input">
                <Button color="default" variant="outlined" component="span">
                  Upload Image
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  id="file-input"
                  onChange={handleImageChange}
                  className={classes.fileInput}
                />
              </label>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextFieldWrapper
                label="The name of the webinar"
                id="name"
                name="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextFieldWrapper
                label="Price"
                id="price"
                name="price"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
                required
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextFieldWrapper
                label="Link"
                id="link"
                name="link"
                value={link}
                onChange={(event) => {
                  setLink(event.target.value);
                }}
                required
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <MuiPickersUtilsProvider utils={MomentUtils} locale="en-au">
                <DateTimePicker
                  margin="normal"
                  fullWidth
                  clearable
                  ampm={false}
                  label="Time of holding"
                  okLabel="Confirmation"
                  cancelLabel="Cancellation"
                  clearLabel="Clean"
                  labelFunc={(mydate) =>
                    mydate ? mydate.format("HH:mm YYYY/MM/DD") : ""
                  }
                  value={time}
                  onChange={setTime}
                  inputVariant="outlined"
                  required
                  hideTabs={false}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <SelectWrapper
                label="Webinar floor"
                labelId="TierLabel"
                id="tier"
                name="tier"
                value={tier}
                onChange={(event) => {
                  setTier(event.target.value);
                }}
              >
                {getWebinarTiers().map((tierItem) => [
                  <MenuItem value={tierItem.id} key={tierItem.id}>
                    {tierItem.tier}
                  </MenuItem>,
                ])}
              </SelectWrapper>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextFieldWrapper
                label="Duration in minutes"
                id="duration"
                name="duration"
                value={duration}
                onChange={(event) => {
                  setDuration(event.target.value);
                }}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <SelectWrapper
                label="Webinars category"
                labelId="categoryLabel"
                id="category"
                name="category"
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
              >
                {webinarCategoryList.map((webinarCategoryItem) => [
                  <MenuItem
                    value={webinarCategoryItem.categoryId}
                    key={webinarCategoryItem.categoryId}
                  >
                    {webinarCategoryItem.category}
                  </MenuItem>,
                  webinarCategoryItem.children &&
                    webinarCategoryItem.children.map(
                      (webinarCategoryItemChild) => [
                        <MenuItem
                          value={webinarCategoryItemChild.categoryId}
                          className={classes.childwebinarCategory}
                          key={webinarCategoryItemChild.categoryId}
                        >
                          {webinarCategoryItemChild.category}
                        </MenuItem>,
                        webinarCategoryItemChild.children &&
                          webinarCategoryItemChild.children.map(
                            (webinarCategoryItemGrandChild) => [
                              <MenuItem
                                value={webinarCategoryItemGrandChild.categoryId}
                                className={classes.grandChildwebinarCategory}
                                key={webinarCategoryItemGrandChild.categoryId}
                              >
                                {webinarCategoryItemGrandChild.category}
                              </MenuItem>,
                            ]
                          ),
                      ]
                    ),
                ])}
              </SelectWrapper>
            </Grid>

            <Grid item xs={12} md={6}>
              <SelectWrapper
                label="Webinar type"
                labelId="typeLabel"
                id="type"
                name="type"
                value={type}
                onChange={(event) => {
                  setType(event.target.value);
                }}
              >
                {getWebinarTypes().map((typeItem) => [
                  <MenuItem value={typeItem.id} key={typeItem.id}>
                    {typeItem.type}
                  </MenuItem>,
                ])}
              </SelectWrapper>
            </Grid>

            <Grid item xs={12}>
              <Editor
                initialValue={description}
                init={{
                  directionality: "ltr",
                  language: "en",
                  plugins:
                    "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
                  imagetools_cors_hosts: ["picsum.photos"],
                  menubar: "file edit view insert format tools table help",
                  toolbar:
                    "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
                  toolbar_sticky: true,
                  autosave_ask_before_unload: true,
                  autosave_interval: "30s",
                  autosave_prefix: "{path}{query}-{id}-",
                  autosave_restore_when_empty: false,
                  autosave_retention: "2m",
                  image_advtab: true,
                  content_css: "//www.tiny.cloud/css/codepen.min.css",
                  link_list: [
                    { title: "My page 1", value: "http://www.tinymce.com" },
                    { title: "My page 2", value: "http://www.moxiecode.com" },
                  ],
                  image_list: [
                    { title: "My page 1", value: "http://www.tinymce.com" },
                    { title: "My page 2", value: "http://www.moxiecode.com" },
                  ],
                  image_class_list: [
                    { title: "None", value: "" },
                    { title: "Some class", value: "class-name" },
                  ],
                  importcss_append: true,
                  file_picker_callback(callback, value, meta) {
                    /* Provide file and text for the link dialog */
                    if (meta.filetype === "file") {
                      callback("https://ndolet.com/nd_en.jpg", {
                        text: "My text",
                      });
                    }

                    /* Provide image and alt text for the image dialog */
                    if (meta.filetype === "image") {
                      callback("https://ndolet.com/nd_cn.jpg", {
                        alt: "My alt text",
                      });
                    }

                    /* Provide alternative source and posted for the media dialog */
                    if (meta.filetype === "media") {
                      callback("movie.mp4", {
                        source2: "alt.ogg",
                        poster: "https://geniusandcourage.com/IMG_0015.PNG",
                      });
                    }
                  },
                  templates: [
                    {
                      title: "New Table",
                      description: "creates a new table",
                      content:
                        '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
                    },
                    {
                      title: "Starting my story",
                      description: "A cure for writers block",
                      content: "Once upon a time...",
                    },
                    {
                      title: "New list with dates",
                      description: "New List with dates",
                      content:
                        '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
                    },
                  ],
                  template_cdate_format:
                    "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
                  template_mdate_format:
                    "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
                  height: 600,
                  image_caption: true,
                  quickbars_selection_toolbar:
                    "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                  noneditable_noneditable_class: "mceNonEditable",
                  toolbar_mode: "sliding",
                  contextmenu: "link image imagetools table",
                }}
                onEditorChange={(content) => {
                  setDescription(content);
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <AlertResponse message={serverError} />
            </Grid>
            <Grid item xs={11}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Record
              </Button>
              <LinkWrapper to="/webinar">
                <Button variant="contained" color="default">
                  opt out
                </Button>
              </LinkWrapper>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </>
  );
}
export default WebinarEdit;
