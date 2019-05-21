const NHOURS = 24;
const NCOURTS = 6;
const START_HOUR = 6;
const END_HOUR = 21;

class Reservation {
  constructor(from, to, owner) {
    this.from = from;
    this.to = to;
    this.owner = owner;
  }

  serialize() {
    return {
      from: this.from,
      to: this.to,
      owner: this.owner
    };
  }
}

class Court {
  constructor(id) {
    this.id = id;
    this.reservations = [];
  }

  serialize() {
    return {
      id: this.id,
      reservations: this.reservations.map(r => r.serialize())
    };
  }

  makeReservation({ from, to, owner }) {
    if (!this.isAvailable(from, to)) {
      throw new Error("Already taken");
    }

    this.reservations.push(new Reservation(from, to, owner));
  }

  isAvailable(from, to) {
    const overlapped = this.reservations.filter(
      r => !((from >= r.to && to > r.to) || (from < r.from && to <= r.from))
    );
    return overlapped.length == 0;
  }
}

const courts = [...Array(6).keys()].map(id => new Court(id));

module.exports = {
  initRoutes: app => {
    app
      .get("/api/courts", (req, res) => {
        res.json(courts.map(court => court.serialize()));
      })
      .get("/api/courts/:id", function(req, res) {
        res.json(courts[req.params.id].serialize());
      })
      .post("/api/courts/:id/reservations", function(req, res) {
        const court = courts[req.params.id];
        try {
          court.makeReservation(req.body);
        } catch (err) {
          res.status(400);
          res.json({ message: err });
        }
        res.json(courts[req.params.id].serialize());
      });
  }
};
