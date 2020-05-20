const getOrigin = () => {
  return (
    window.location.hostname +
    (window.location.port ? ':' + window.location.port : '')
  );
};

export default getOrigin;
