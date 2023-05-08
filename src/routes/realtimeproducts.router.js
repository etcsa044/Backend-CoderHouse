

router.delete("/:pid", async (req, res) => {
    let {pid} = req.params;
    pid = parseInt(pid);
    let response = await productManager.deleteProduct(pid);
    res.sendStatus(response);
})