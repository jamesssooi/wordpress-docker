/** ============================================================================
 * Project Name Here
 * @author: James Ooi
 * ========================================================================== */
import { foo } from 'lib/utils'

// Wait for DOM to finish loading
window.addEventListener('DOMContentLoaded', onInitialize)

function onInitialize() {
  foo();
  console.log(`Hello world! 5+2=${5+2}`)
}
