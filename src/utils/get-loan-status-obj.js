const statuses = {
  APPROVED: {
    name: "Aprobado",
    bgColor: "status.approved",
    color: "primary.900",
  },
  REJECTED: {
    name: "Rechazado",
    bgColor: "status.rejected",
    color: "white",
  },
  DISBURSED: {
    name: "Desembolsado",
    bgColor: "status.disbursed",
    color: "white",
  },
  APPLIED: {
    name: "Solicitado",
    bgColor: "status.applied",
    color: "white",
  },
  REVIEWING: {
    name: "En Revisión",
    bgColor: "status.reviewing",
    color: "white",
  },
  PAID: {
    name: "Pagado",
    bgColor: "status.paid",
    color: "primary.900",
  },
  FUNDING: {
    name: "Fondeando",
    bgColor: "status.funding",
    color: "white",
  },
};

const getLoanStatusObj = (status) => {
  return statuses[status];
};

export default getLoanStatusObj;
