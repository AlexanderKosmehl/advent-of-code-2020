/*
    Helper Functions
*/

/**
 * Checks whether the given passport contains all required fields
 * @param {string} passportString
 * @returns {boolean}
 */
function checkPassportString (passportString) {
  const passportValidation = {
    byr: false,
    iyr: false,
    eyr: false,
    hgt: false,
    hcl: false,
    ecl: false,
    pid: false,
    cid: false
  }

  const passportFields = passportString.split(' ')
  for (const field of passportFields) {
    // Regex magic: matches anything that is preceeded by 3 characters and starts with :
    const strippedField = field.replace(/(?<=(...)):.*/, '')
    if (strippedField in passportValidation) {
      passportValidation[strippedField] = true
    }
  }

  // Checks all fields in the validation object
  // Returns false if any props besides cid are false and true otherwise
  for (const prop in passportValidation) {
    if (prop !== 'cid' && passportValidation[prop] !== true) return false
  }
  return true
}

/**
   * Validates a given string using the rules from the task.
   * @param {string} passportString
   * @returns {boolean}
   */
function validatePassportString (passportString) {
  // Birth Year       four digits; at least 1920 and at most 2002.
  const birthYearMatch = passportString.match(/(?<=byr:)\d{4}(?!\w)/)
  if (!birthYearMatch) return false
  const birthYear = Number(birthYearMatch[0])
  if (birthYear < 1920 || birthYear > 2002) return false

  // Issue Year       four digits; at least 2010 and at most 2020.
  const issueYearMatch = passportString.match(/(?<=iyr:)\d{4}(?!\w)/)
  if (!issueYearMatch) return false
  const issueYear = Number(issueYearMatch[0])
  if (issueYear < 2010 || issueYear > 2020) return false

  // Expiration Year  four digits; at least 2020 and at most 2030.
  const expirationYearMatch = passportString.match(/(?<=eyr:)\d{4}(?!\w)/)
  if (!expirationYearMatch) return false
  const expirationYear = Number(expirationYearMatch[0])
  if (expirationYear < 2020 || expirationYear > 2030) return false

  // Height           a number followed by either cm or in:
  //                        If cm, the number must be at least 150 and at most 193.
  //                        If in, the number must be at least 59 and at most 76.
  const heightMatch = passportString.match(/(?<=hgt:)(\d+)(cm|in)(?!\w)/)
  if (!heightMatch) return false
  const height = Number(heightMatch[1])
  const heightUnit = heightMatch[2]
  if (heightUnit === 'cm') {
    if (height < 150 || height > 193) return false
  } else if (heightUnit === 'in') {
    if (height < 59 || height > 76) return false
  } else return false

  // Hair Color       a # followed by exactly six characters 0-9 or a-f.
  const hairColorMatch = passportString.match(/(?<=hcl:)#[0-9a-f]{6}(?!\w)/)
  if (!hairColorMatch) return false

  // Eye Color        exactly one of: amb blu brn gry grn hzl oth.
  const eyeColorMatch = passportString.match(/(?<=ecl:)(amb|blu|brn|gry|grn|hzl|oth)(?!\w)/)
  if (!eyeColorMatch) return false

  // Passport ID      a nine-digit number, including leading zeroes.
  const passportIdMatch = passportString.match(/(?<=pid:)\d{9}(?!\w)/)
  if (!passportIdMatch) return false

  // Country ID       ignored, missing or not.
  // Nothing to do here

  // If no test failed the string is valid
  return true
}

module.exports = {
  checkPassportString,
  validatePassportString
}
