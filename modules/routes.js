import db from "../Database/index.js";
function ModuleRoutes(app) {
  app.put("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    const moduleIndex = db.modules.findIndex((m) => m._id === mid);
    db.modules[moduleIndex] = {
      ...db.modules[moduleIndex],
      ...req.body,
    };
    res.sendStatus(204);
  });

  app.delete("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    db.modules = db.modules.filter((m) => m._id !== mid);
    res.sendStatus(200);
  });

  app.get("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;

    const courseNumber = db.courses.filter((c) => c["_id"]["$oid"] === cid)[0][
      "number"
    ];
    const modules = db.modules.filter((m) => m.course === courseNumber);
    res.send(modules);
  });
  app.post("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const courseNumber = db.courses.filter((c) => c["_id"]["$oid"] === cid)[0][
      "number"
    ];
    const newModule = {
      ...req.body,
      course: courseNumber,
      _id: new Date().getTime().toString(),
    };
    db.modules.push(newModule);
    res.send(newModule);
  });
}
export default ModuleRoutes;
