const sql = require("./db.js");

function arrangeData(item, images) {
  let itemImages = images.filter((image) => {
    return image.itemId == item.idItem;
  });

  if (itemImages.length > 0) {
    return {
      itemId: item.idItem,
      itemName: item.itemName,
      itemDescription: item.itemDescription,
      itemDate: item.itemDate,
      itemQuality: item.itemQuality,
      itemQuantity: item.itemQuantity,
      itemLike: item.itemLike,
      itemNameEn: item.itemNameEn,
      itemDescriptionEn: item.itemDescriptionEn,
      subName: item.subName,
      categoryName: item.categoryName,
      subNameEn: item.subNameEn,
      categoryNameEn: item.categoryNameEn,
      idSub: item.idSub,
      macAddress: item.macAddress,
      idFavorites: item.idFavorites,
      images: itemImages,
      likes: item.favoritesCount,
      isFavorite: true,
    };
  } else {
    return {
      itemId: item.idItem,
      itemName: item.itemName,
      itemDescription: item.itemDescription,
      itemDate: item.itemDate,
      itemQuality: item.itemQuality,
      itemQuantity: item.itemQuantity,
      itemLike: item.itemLike,
      itemNameEn: item.itemNameEn,
      itemDescriptionEn: item.itemDescriptionEn,
      subName: item.subName,
      categoryName: item.categoryName,
      subNameEn: item.subNameEn,
      categoryNameEn: item.categoryNameEn,
      idSub: item.idSub,
      macAddress: item.macAddress,
      idFavorites: item.idFavorites,
      images: [],
      likes: item.favoritesCount,
      isFavorite: true,
    };
  }
}

const Favorites = function (favorites) {
  this.macAddress = favorites.macAddress;
  this.itemId = favorites.itemId;
};

Favorites.create = (newFavorites, result) => {

  sql.query(`SELECT * FROM favorites where itemId = ${newFavorites.itemId} and macAddress = '${newFavorites.macAddress}'`, (err, res) => {
    console.log(err);
    if (err || res.length == 0) {
      sql.query("INSERT INTO favorites SET ?", newFavorites, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("created favorites: ", {id: res.insertId, ...newFavorites});
        return result(null, {id: res.insertId, ...newFavorites});
      });
      return;
    }

    sql.query(`DELETE FROM favorites WHERE itemId = ${newFavorites.itemId} and macAddress = '${newFavorites.macAddress}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({kind: "not_found"}, null);
        return;
      }

      result(null, res);
    });

  });
};

Favorites.findById = (favoritesId, result) => {
  sql.query(
    `SELECT * FROM favorites WHERE id = ${favoritesId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found favorites: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({kind: "not_found"}, null);
    }
  );
};

Favorites.findByFoundFav = (macAddress, itemId, result) => {
  sql.query(
    `SELECT * FROM favorites WHERE macAddress = '${macAddress}' AND itemId = ${itemId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found favorites: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({kind: "not_found"}, null);
    }
  );
};
Favorites.findByMacAddress = (macAddress, result) => {
  sql.query(
    `SELECT item.idItem , item.itemName ,favorites.idFavorites ,subCategory.idSub , favorites.macAddress , 
      item.itemDescription ,item.itemNameEn , item.itemDescriptionEn , DATE_FORMAT(item.itemDate, '%d/%m/%Y') 
      AS itemDate , item.itemQuality , item.itemQuantity , item.itemLike , subCategory.subName , 
      category.categoryName , category.categoryNameEn ,subCategory.subNameEn,
      count(f.idFavorites) as favoritesCount
      FROM favorites JOIN item 
      JOIN subCategory JOIN itemCategory JOIN category ON favorites.itemId = item.idItem AND 
      itemCategory.itemId = item.idItem AND itemCategory.subId = subCategory.idSub AND 
      subCategory.categoryId = category.idCategory 
    left join favorites as f on item.idItem = f.itemId 
    WHERE favorites.macAddress = '${macAddress}' group by favorites.idFavorites, item.idItem, subCategory.idSub`,
    (err, res) => {
      if (err) {
        return result(null, err);
      }
      sql.query(`SELECT * FROM image `, (err, resOne) => {
        let imageItem = res.map((item) => {
          return arrangeData(item, resOne);
        });
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        if (res.length) {
          console.log("found favorites: ", res);
          result(null, imageItem);
          return;
        }

        result({kind: "not_found"}, null);
      });
    }
  );
};

Favorites.getAll = (result) => {
  sql.query(`SELECT * FROM favorites `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("favorites: ", res);
    result(null, res);
  });
};

Favorites.updateById = (id, favorites, result) => {
  sql.query(
    "UPDATE favorites SET ? WHERE idFavorites = ?",
    [favorites, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({kind: "not_found"}, null);
        return;
      }

      console.log("updated favorites: ", {id: id, ...favorites});
      result(null, {id: id, ...favorites});
    }
  );
};

Favorites.remove = (id, result) => {
  sql.query("DELETE FROM favorites WHERE idFavorites = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({kind: "not_found"}, null);
      return;
    }

    console.log("deleted favorites with id: ", id);
    result(null, res);
  });
};

Favorites.removeAll = (result) => {
  sql.query("DELETE FROM favorites", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} favorites`);
    result(null, res);
  });
};

module.exports = Favorites;
