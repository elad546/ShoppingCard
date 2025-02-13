import logging
import mariadb
import homeassistant.helpers.config_validation as cv
import voluptuous as vol
from homeassistant.components.sensor import PLATFORM_SCHEMA
from homeassistant.helpers.entity import Entity
from homeassistant.const import CONF_HOST, CONF_USERNAME, CONF_PASSWORD, CONF_DATABASE

_LOGGER = logging.getLogger(__name__)

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend({
    vol.Required(CONF_HOST): cv.string,
    vol.Required(CONF_USERNAME): cv.string,
    vol.Required(CONF_PASSWORD): cv.string,
    vol.Required(CONF_DATABASE): cv.string,
})

def setup_platform(hass, config, add_entities, discovery_info=None):
    add_entities([ShoppingListSensor(config)])

class ShoppingListSensor(Entity):
    def __init__(self, config):
        self._host = config[CONF_HOST]
        self._user = config[CONF_USERNAME]
        self._password = config[CONF_PASSWORD]
        self._database = config[CONF_DATABASE]
        self._state = "unknown"
        self._items = []

    def update(self):
        try:
            conn = mariadb.connect(
                host=self._host,
                user=self._user,
                password=self._password,
                database=self._database
            )
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT name, category, image FROM items_table;")
            self._items = cursor.fetchall()
            cursor.close()
            conn.close()
            self._state = "updated"
        except Exception as e:
            _LOGGER.error("Error fetching shopping list: %s", e)

    @property
    def name(self):
        return "Shopping List"

    @property
    def state(self):
        return self._state

    @property
    def extra_state_attributes(self):
        return {"items": self._items}