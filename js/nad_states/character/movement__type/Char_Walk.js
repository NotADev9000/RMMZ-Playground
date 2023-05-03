function Char_Walk() {
    this.initialize(...arguments);
}

Char_Walk.prototype = Object.create(Char_Type_Base.prototype);
Char_Walk.prototype.constructor = Char_Walk;

Char_Walk.prototype.initialize = function(machine) {
    Char_Type_Base.prototype.initialize.call(this, machine);
};

//------------------
// #region Update
//------------------

Char_Walk.prototype.update = function(character) {
    this.updateMove(character);
};

// #endregion
