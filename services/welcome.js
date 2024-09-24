function welcome(req, res) {
  res.status(200).json({
    'name': 'Raqeeb API',
    'version': '2.0.0',
    'description': 'API for raqeeb ERP system.',
    'endpoints': {

    },
    'status': 'API is up and running'
  });
}


export { welcome }
