module.exports = function(sequelize,DataTypes){
  return sequelize.define(
      'user',
      {
          id:{
              type: DataTypes.INTEGER,
              primaryKey: true,
              allowNull: true,
              autoIncrement: true
          },
          username:{
              type: DataTypes.STRING,
              allowNull: false,
              field: 'username'
          },
          password:{
              type: DataTypes.STRING,
              allowNull: false,
              field: 'password'
          }
      },
      {
          timestamps: false
      }
  );
}