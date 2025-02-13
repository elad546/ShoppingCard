"""Shopping List Integration"""
from homeassistant.core import HomeAssistant

async def async_setup(hass: HomeAssistant, config: dict):
    """Set up the Shopping List component."""
    hass.states.async_set("shopping_card.status", "loaded")
    return True